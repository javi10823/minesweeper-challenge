import { takeEvery } from 'redux-saga/effects';
import { SEND_COMMAND } from '../actionTypes';

export function* sendCommandSaga(params: any) {
  yield takeEvery(SEND_COMMAND, (action: { type: string; payload: string }) => {
    params.socket.send(action.payload);
  });
}
