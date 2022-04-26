import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendCommand } from '../../store/actions/sendCommand';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import { Cells, FlagButton, ButtonContainer, ButtonsContainer } from './styles';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import MineImage from '../../assets/icons/mine.png';
import { playing } from '../../store/actions';

interface Props {
  data: string[];
  startTimer: () => void;
  elapsedTime: string;
}

const Minesweeper: FC<Props> = ({ data, startTimer, elapsedTime }) => {
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
        return (
          <img style={{ width: 20, height: 20 }} src={MineImage} alt="Mine" />
        );
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

  const selectLevel = (level: number) => {
    dispatch(sendCommand(`new ${level}`));
    dispatch(playing(true));
    startTimer();
  };

  return (
    <div>
      <ButtonContainer>
        <ButtonsContainer>
          <Typography>{elapsedTime}</Typography>
          <Typography>Select difficulty level</Typography>
          <ButtonGroup variant="outlined">
            <Button onClick={selectLevel.bind(null, 1)}>One</Button>
            <Button onClick={selectLevel.bind(null, 2)}>Two</Button>
            <Button onClick={selectLevel.bind(null, 3)}>Three</Button>
            <Button onClick={selectLevel.bind(null, 4)}>Four</Button>
          </ButtonGroup>
          <FlagButton
            variant={flagButtonSelected ? 'contained' : 'outlined'}
            onClick={setFlagButtonSelected.bind(null, !flagButtonSelected)}
          >
            <EmojiFlagsIcon />
          </FlagButton>
        </ButtonsContainer>
      </ButtonContainer>

      {data.map((item, row) => (
        <Grid
          key={row}
          container
          justifyContent={item.length > 9 ? 'center' : 'initial'} // TODO: The grid doesn't show all cells when centered on big maps, we should center the grid on all cases!
          alignItems="center"
          wrap="nowrap"
          width="auto"
          columns={item.length}
        >
          {item.split('').map((item, column) => (
            <Cells
              key={column}
              cells={formatCells(item)}
              item={item}
              flag={isMarked(column, row)}
              onClick={handlerCells.bind(null, column, row, item)}
            >
              {isMarked(column, row) ? <EmojiFlagsIcon /> : formatCells(item)}
              {/* {parseInt(item) !== 0 ? column : null} */} {/* TODO: DELETE AFTER, FOR TESTING PURPOSES */}
            </Cells>
          ))}
        </Grid>
      ))}
    </div>
  );
};

export default Minesweeper;
