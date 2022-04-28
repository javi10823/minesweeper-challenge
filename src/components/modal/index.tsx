import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContainer, Container, Text } from './styles';

interface Props {
  open: boolean;
  response: string;
  time: () => string;
  onClose: () => void;
}

const Modal = ({ response, time, open, onClose }: Props) => {
  const navigate = useNavigate();
  const formatResponse = () => {
    if (response === 'You lose') return `${response}. Better Luck next time!`;
    if (response === 'You win') return `Congratulations, ${response}`;
  };

  const onClickHome = async () => {
    await onClose();
    navigate(-1);
  };

  return (
    <ModalContainer
      open={open}
      // onClose={onClose}
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
          <Button variant="contained">Play Again</Button>
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
