import { SEND_COMMAND } from '../actionTypes';

export const sendCommand = (command: string) => ({
  type: SEND_COMMAND,
  payload: command,
});
