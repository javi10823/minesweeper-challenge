import React from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { colors } from '../../config/theme';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playing, sendCommand } from '../../store/actions';





const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const selectLevel = async (level: number) => {
    await dispatch(sendCommand(`new ${level}`));
    await dispatch(playing(true));

    navigate('/GameScreen', {state: {level}});
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
      <Typography fontSize={30} fontWeight="700" marginBottom={5}>Select difficulty level</Typography>
      <ButtonGroup variant="outlined">
        <Button style={{marginInline: 10, width: 150, borderRadius: 10, height: 100, color: 'white', fontSize: 25, fontWeight: '700', backgroundColor: colors.surfieGreen}} onClick={selectLevel.bind(null, 1)}>One</Button>
        <Button style={{marginInline: 10, width: 150, borderRadius: 10, height: 100, color: 'white', fontSize: 25, fontWeight: '700', backgroundColor: colors.green}} onClick={selectLevel.bind(null, 2)}>Two</Button>
        <Button style={{marginInline: 10, width: 150, borderRadius: 10, height: 100, color: 'white', fontSize: 25, fontWeight: '700', backgroundColor: colors.red}} onClick={selectLevel.bind(null, 3)}>Three</Button>
        <Button style={{marginInline: 10, width: 150, borderRadius: 10, height: 100, color: 'white',  fontSize: 25, fontWeight: '700', backgroundColor: colors.purple}} onClick={selectLevel.bind(null, 4)}>Four</Button>
      </ButtonGroup>
    </div>
  );
};

export default Home;