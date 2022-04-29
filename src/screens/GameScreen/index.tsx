import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { Minesweeper, Modal } from '../../components';
import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import type { Location } from 'history';
import { ModalContainer } from './styles';

const GameScreen = () => {
  const location: Location = useLocation();
  const { data, loading } = useAppSelector(({ minesweeper }) => minesweeper);
  const { response, playing } = useAppSelector(({ response }) => response);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const map = data.slice(1, -1).split('\n');

  const startTimer = () => {
    const intervalID = setInterval(
      () => setCurrentTime(performance.now()),
      1000
    );
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
      <ModalContainer>
        <CircularProgress size={80} />
      </ModalContainer>
    );

  return (
    <div className="App">
      <Modal
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        level={location.state.level}
        open={openModal}
        onClose={setOpenModal.bind(null, false)}
        response={response}
        time={formatTime.bind(null, currentTime)}
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
