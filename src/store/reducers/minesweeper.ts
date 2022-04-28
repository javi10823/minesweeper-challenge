import { GeneralActionType } from '../../interfaces';
import { GET_MINESWEEPER, GET_MINESWEEPER_ERROR, SET_LOADING } from '../actionTypes';

export const initialValues = {
  data: '',
  loading: true,
};

export const minesweeperReducer = (
  state = initialValues,
  action: GeneralActionType
) => {
  switch (action.type) {
  case GET_MINESWEEPER:
    return { data: action.payload, loading: false };
  case GET_MINESWEEPER_ERROR:
    return { data: action.payload, loading: false };
  case SET_LOADING:
    return { ...state, loading: action.payload };
  default:
    return state;
  }
};
