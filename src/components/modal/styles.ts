import { styled } from '@mui/material/styles';
import { Modal, Paper, Theme, Typography } from '@mui/material';
import { colors } from '../../config/theme';

interface ContainerProps {
  theme: Theme;
}

export const Container = styled(Paper)(({ theme }: ContainerProps) => ({
  backgroundColor: theme.palette.primary,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderColor: colors.transparent,
  boxShadow: 24,
  outline: 'none',
  color: theme.palette.text.secondary,
  paddingTop: '1%',
  paddingBottom: '1%',
  paddingLeft: '2%',
  paddingRight: '2%',
  textAlign: 'center',
}));

export const ModalContainer = styled(Modal)({
  alignItems: 'center',
  outline: 'none',
});

export const Text = styled(Typography)({
  fontWeight: '200',
});
