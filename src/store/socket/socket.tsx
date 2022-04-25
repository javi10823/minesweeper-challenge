import { minesweeperData, minesweeperError } from '../actions';

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
    switch (data[0]) {
    case 'new':
      data[1].trim() === 'OK' && socket.send('map');
      break;
    case 'map':
      dispatch(minesweeperData(data[1]));
      break;
    case 'open':
      socket.send('map');
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
