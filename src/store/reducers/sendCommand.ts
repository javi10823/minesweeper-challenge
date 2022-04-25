import { SendCommandType } from '../../interfaces';
import { SEND_COMMAND } from '../actionTypes';

export const initialValues = {
  data: '',
};

export const sendCommandReducer = (
  state = initialValues,
  action: SendCommandType
) => {
  switch (action.type) {
  case SEND_COMMAND:
    return { data: action.payload };
  default:
    return state;
  }
};
