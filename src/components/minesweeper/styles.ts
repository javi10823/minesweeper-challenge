import { styled } from '@mui/material/styles';
import { Paper, Button, Theme } from '@mui/material';

interface CellsProps {
  cells: string;
  item: string;
  disabled: boolean;
  theme: Theme;
  flag: boolean
}

export const Cells = styled(Paper)(({ cells, item, theme, flag }: CellsProps) => ({
  backgroundColor: cells === '' && item !== '0' || flag ? '#0d48dd' : 'aqua',
  display: 'flex',
  width: '15px',
  height: '14px',
  padding: '10px',
  margin: '3px',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const FlagButton = styled(Button)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});
