import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendCommand } from '../../store/actions/sendCommand';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

import { Cells, FlagButton } from './styles';
import { Grid } from '@mui/material';

interface Props {
  data: string[];
}

const Minesweeper = (props: Props) => {
  const { data } = props;
  const [flagButtonSelected, setFlagButtonSelected] = useState(false);
  const [selectedCell, setSelectedCell] = useState(NaN);
  const [selectedRow, setSelectedRow] = useState(NaN);
  const dispatch = useDispatch();

  const formatCells = (item: string) => {
    if (isNaN(parseFloat(item))) {
      switch (item) {
      case '□':
        return '';
      case '*':
        return 'mine';
      }
    } else if (parseInt(item) !== 0) return item;
    return '';
  };

  const handlerCells = (column: number, row: number) => {
    if (flagButtonSelected) {
      setSelectedCell(column);
      setSelectedRow(row);
    } else {
      dispatch(sendCommand(`open ${column} ${row}`));
    }
  };

  return (
    <div>
      <FlagButton
        variant={flagButtonSelected ? 'contained' : 'outlined'}
        onClick={() => setFlagButtonSelected(!flagButtonSelected)}
      >
        <EmojiFlagsIcon />
      </FlagButton>
      {data.map((item, row) => (
        <Grid
          color='red'
          key={row}
          container
          justifyContent='center'
          alignItems='center'
        >
          {item.split('').map((item, column) => (
            <Cells
              key={column}
              cells={formatCells(item)}
              item={item}
              onClick={() => handlerCells(column, row)}
            >
              {selectedCell === column && selectedRow === row ? (
                <EmojiFlagsIcon />
              ) : (
                formatCells(item)
              )}
            </Cells>
          ))}
        </Grid>
      ))}
    </div>
  );
};

export default Minesweeper;
