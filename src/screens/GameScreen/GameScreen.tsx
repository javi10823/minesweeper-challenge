import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { Minesweeper, Modal } from '../../components';
import { CircularProgress, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendCommand } from '../../store/actions';
import type { Location } from 'history';

const GameScreen = () => {
  const location: Location = useLocation();
  const dispatch = useDispatch();
  const { data, loading } = useAppSelector(({ minesweeper }) => minesweeper);
  const { response, playing } = useAppSelector(({ response }) => response);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const map = data.slice(1, -1).split('\n');

  const startTimer = () => {
    const intervalID = setInterval(() => setCurrentTime(performance.now()), 1000);
    setTimer(intervalID);
  };

  useEffect(() => {
    if (!loading) {
      setStartTime(performance.now());
      startTimer();
    }
  }, [loading]);

  useEffect(() => {
    if (response === 'You lose' || response === 'You win') {
      if (timer) clearInterval(timer);
      setOpenModal(true);
    }
  }, [playing, response]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(sendCommand(`new ${location.state.level}`));
  }, [location]);

  const formatTime = (endTime: number) => {
    const timeDiff = (endTime - startTime) / 1000;
    const m = Math.floor((timeDiff % 3600) / 60);
    const s = Math.floor((timeDiff % 3600) % 60);
    const mDisplay = m > 0 ? (m <= 9 ? '0' : '') + m : '00';
    const sDisplay = s > 0 ? (s <= 9 ? '0' : '') + s : '00';
    const time = mDisplay + ':' + sDisplay;
    return time;
  };

  if (loading)
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    );

  return (
    <div className="App">
      <Modal
        open={openModal}
        onClose={setOpenModal.bind(null, false)}
        response={response}
        time={() => formatTime(currentTime)}
      />
      <Minesweeper
        data={map}
        startTimer={setStartTime.bind(null, performance.now())}
        elapsedTime={formatTime(currentTime)}
      />
    </div>
  );
};

export default GameScreen;
