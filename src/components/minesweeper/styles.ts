import { styled } from '@mui/material/styles';
import { Paper, Button, Theme, Container } from '@mui/material';

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
      (cells === '' && item !== '0') || flag ? '#0d48dd' : 'aqua',
    display: 'flex',
    minWidth: '25px',
    minHeight: '25px',
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
});

export const ButtonsContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
