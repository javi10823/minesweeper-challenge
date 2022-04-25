import React from 'react';
import { useAppSelector } from '../../hooks';
import Minesweeper from '../../components/minesweeper';

const Home = () => {
  const { data, loading } = useAppSelector(({ socket }) => socket);
  const map = data.slice(1, -1).split('\n');

  return (
    <div className='App'>
      <Minesweeper data={map} />
    </div>
  );
};

export default Home;
