import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { playing, sendCommand, setLoading } from '../../store/actions';
import { ModalContainer, Container, Text } from './styles';

interface Props {
  open: boolean;
  response: string;
  level: number;
  time: () => string;
  onClose: () => void;
}

const Modal = ({ response, time, open, onClose, level }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formatResponse = () => {
    if (response === 'You lose') return `${response}. Better Luck next time!`;
    if (response === 'You win') return `Congratulations, ${response}`;
  };

  const onClickHome = async () => {
    await onClose();
    navigate(-1);
  };

  const onClickPlay = async () => {
    await dispatch(setLoading(true));
    await onClose();
    await dispatch(sendCommand(`new ${level}`));
    await dispatch(playing(true));
  };

  return (
    <ModalContainer
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Container>
        <Text id="child-modal-title" variant="h5" component="h2">
          {formatResponse()}
        </Text>
        <Text id="child-modal-description" variant="h6">
          {`Time: ${time()}`}
        </Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBlock: 10,
          }}
        >
          <Button variant="contained" onClick={onClickPlay}>
            Play Again
          </Button>
          <Button variant="contained" onClick={onClickHome}>
            Home
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </div>
      </Container>
    </ModalContainer>
  );
};

export default Modal;
