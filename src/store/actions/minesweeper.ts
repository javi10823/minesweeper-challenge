import { GET_MINESWEEPER, GET_MINESWEEPER_ERROR, SET_LOADING } from '../actionTypes';

export const minesweeperData = (data: string) => ({
  type: GET_MINESWEEPER,
  payload: data,
});

export const minesweeperError = (error: string) => ({
  type: GET_MINESWEEPER_ERROR,
  payload: error,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});
