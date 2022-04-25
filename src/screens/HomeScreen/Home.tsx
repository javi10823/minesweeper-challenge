import React from 'react';
import { useAppSelector } from '../../hooks';
import Minesweeper from '../../components/minesweeper';
import { CircularProgress, Container } from '@mui/material';

const Home = () => {
  const { data, loading } = useAppSelector(({ socket }) => socket);
  const map = data.slice(1, -1).split('\n');

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
      <Minesweeper data={map} />
    </div>
  );
};

export default Home;
