import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendCommand } from '../../store/actions/sendCommand';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import { Cells, FlagButton, ButtonContainer, ButtonsContainer } from './styles';
import { Button, Grid, Typography } from '@mui/material';
import MineImage from '../../assets/icons/mine.png';
import { colors } from '../../config/theme';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: string[];
  startTimer: () => void;
  elapsedTime: string;
}

const Minesweeper: FC<Props> = ({ data, elapsedTime }) => {
  const [flagButtonSelected, setFlagButtonSelected] = useState(false);
  const [marked, setMarked] = useState<{ column: number; row: number }[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMarked = useCallback(
    (itemColumn: number, itemRow: number) =>
      marked.find(
        ({ column, row }) => column === itemColumn && row === itemRow
      ),
    [marked]
  );

  const getColor = (item: string) => {
    if (item === '1') return colors.surfieGreen;
    if (item === '2') return colors.green;
    if (item === '3') return colors.red;
    return colors.purple;
  };

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
    } else if (parseInt(item) !== 0)
      return (
        <Typography fontSize={25} fontWeight="700" color={getColor(item)}>
          {item}
        </Typography>
      );
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
        setMarked([...marked, { column, row }]);
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
        <ButtonsContainer>
          <Typography>{elapsedTime}</Typography>
          <Typography>Select difficulty level</Typography>
          <Button onClick={navigate.bind(null, -1)}>home</Button>
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
          style={{ width: (45 + 6) * (item.length), minWidth: '100%' }}
          justifyContent="center"
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
