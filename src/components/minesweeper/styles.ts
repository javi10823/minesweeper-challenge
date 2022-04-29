import { styled } from '@mui/material/styles';
import { Paper, Button, Theme, Container } from '@mui/material';
import {colors} from '../../config/theme';

interface CellsProps {
  cells: string;
  item: string;
  disabled: boolean;
  theme: Theme;
  flag: boolean;
}

export const Cells = styled(Paper)(
  ({ cells, item, theme, flag }: CellsProps) => ({
    backgroundColor:
    flag ? colors.surfieGreen :  (cells === '' && item !== '0') ? colors.blue : colors.aqua,
    display: 'flex',
    minWidth: '25px',
    maxWidth: '25px',
    minHeight: '25px',
    maxHeight: '25px',
    padding: '10px',
    margin: '3px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  })
);

export const FlagButton = styled(Button)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  marginTop: 20,
});

export const ButtonContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  paddingBlock: 10,
  top: 0,
  minWidth: '100%',
  position: 'fixed',
  backgroundColor: 'white',
});

export const ButtonsContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
