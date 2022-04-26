import { minesweeperData, minesweeperError, response } from '../actions';

function setupSocket(dispatch: any) {
  const socket = new WebSocket('wss://hometask.eg1236.com/game1/');

  socket.onerror = (event) => {
    console.log('Socket Error');
    dispatch(minesweeperError(event.type));
  };

  socket.onopen = () => {
    socket.send('new 1');
  };

  socket.onmessage = (event) => {
    const data = event.data.split(':');
    const message = data[1].trim();
    switch (data[0]) {
    case 'new':
      socket.send('map');
      break;
    case 'map':
      dispatch(minesweeperData(data[1]));
      break;
    case 'open':
      socket.send('map');
      message.includes('You win') ||
        (message === 'You lose' &&
          dispatch(
            response(message.includes('You win') ? 'You win' : message)
          ));
      break;
    default:
      break;
    }
  };
  socket.onclose = (e) => {
    console.log(`Socket is closed Unexpectedly. Code: ${e.code}`);
  };

  return socket;
}

export default setupSocket;
