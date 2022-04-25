import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendCommand } from '../../store/actions/sendCommand';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import { Cells, FlagButton, ButtonContainer } from './styles';
import { Grid } from '@mui/material';

interface Props {
  data: string[];
}

const Minesweeper = ({ data }: Props) => {
  const [flagButtonSelected, setFlagButtonSelected] = useState(false);
  const [marked, setMarked] = useState<{ column: number; row: number }[]>([]);
  const dispatch = useDispatch();

  const isMarked = useCallback(
    (itemColumn: number, itemRow: number) =>
      marked.find(
        ({ column, row }) => column === itemColumn && row === itemRow
      ),
    [marked]
  );

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

  const handlerCells = (column: number, row: number, value: string) => {
    if (value === '□' || isMarked(column, row)) {
      if (flagButtonSelected) {
        if (isMarked(column, row)) {
          return setMarked(
            marked.filter(
              (_item, index) =>
                index !==
                marked.findIndex(
                  (markedItem) =>
                    markedItem.column === column && markedItem.row === row
                )
            )
          );
        }
        setMarked([...marked, { column: column, row: row }]);
      } else {
        if (!isMarked(column, row)) {
          dispatch(sendCommand(`open ${column} ${row}`));
        }
      }
    }
  };

  return (
    <div>
      <ButtonContainer>
        <FlagButton
          variant={flagButtonSelected ? 'contained' : 'outlined'}
          onClick={setFlagButtonSelected.bind(null, !flagButtonSelected)}
        >
          <EmojiFlagsIcon />
        </FlagButton>
      </ButtonContainer>
      {data.map((item, row) => (
        <Grid key={row} container justifyContent="center" alignItems="center">
          {item.split('').map((item, column) => (
            <Cells
              key={column}
              cells={formatCells(item)}
              item={item}
              flag={isMarked(column, row)}
              onClick={handlerCells.bind(null, column, row, item)}
            >
              {isMarked(column, row) ? <EmojiFlagsIcon /> : formatCells(item)}
            </Cells>
          ))}
        </Grid>
      ))}
    </div>
  );
};

export default Minesweeper;
