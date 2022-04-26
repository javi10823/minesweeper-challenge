import React from 'react';
import { ModalContainer, Container, Text } from './styles';

interface Props {
  open: boolean;
  response: string;
  time: () => string;
  onClose: () => void;
}

const Modal = ({ response, time, open, onClose }: Props) => {
  const formatResponse = () => {
    if (response === 'You lose') return `${response}. Better Luck next time!`;
    if (response === 'You win') return `Congratulations, ${response}`;
  };

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      aria-labelledby='child-modal-title'
      aria-describedby='child-modal-description'
    >
      <Container>
        <Text id='child-modal-title' variant='h5' component='h2'>
          {formatResponse()}
        </Text>
        <Text id='child-modal-description' variant='h6'>
          {`Time: ${time()}`}
        </Text>
      </Container>
    </ModalContainer>
  );
};

export default Modal;
