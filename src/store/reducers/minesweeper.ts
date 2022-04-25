import { MinesweeperType } from '../../interfaces';
import { GET_MINESWEEPER, GET_MINESWEEPER_ERROR } from '../actionTypes';

export const initialValues = {
  data: '',
  loading: true,
};

export const socketReducer = (
  state = initialValues,
  action: MinesweeperType
) => {
  switch (action.type) {
  case GET_MINESWEEPER:
    return { data: action.payload, loading: false };
  case GET_MINESWEEPER_ERROR:
    return { data: action.payload, loading: false };
  default:
    return state;
  }
};
