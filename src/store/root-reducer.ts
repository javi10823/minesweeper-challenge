import { combineReducers } from '@reduxjs/toolkit';
import { sendCommandReducer, socketReducer } from './reducers';

const rootReducer = combineReducers({
  sendCommand: sendCommandReducer,
  socket: socketReducer,
});

export default rootReducer;
