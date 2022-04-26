import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { Minesweeper, Modal } from '../../components';
import { CircularProgress, Container } from '@mui/material';

const Home = () => {
  const { data, loading } = useAppSelector(({ minesweeper }) => minesweeper);
  const { response } = useAppSelector(({ response }) => response);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const map = data.slice(1, -1).split('\n');
  useEffect(() => {
    if (!loading) {
      setStartTime(performance.now());
    }
  }, [loading]);

  useEffect(() => {
    if (response === 'You lose' || response === 'You win') {
      setEndTime(performance.now());
      setOpenModal(true);
    }
  }, [response]);

  const formatTime = () => {
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
    <div className='App'>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        response={response}
        time={formatTime}
      />
      <Minesweeper data={map} />
    </div>
  );
};

export default Home;
