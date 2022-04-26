import { combineReducers } from '@reduxjs/toolkit';
import { sendCommandReducer, minesweeperReducer, responseReducer } from './reducers';

const rootReducer = combineReducers({
  sendCommand: sendCommandReducer,
  minesweeper: minesweeperReducer,
  response: responseReducer,
});

export default rootReducer;
