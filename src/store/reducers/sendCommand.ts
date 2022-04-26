import { GeneralActionType } from '../../interfaces';
import { SEND_COMMAND } from '../actionTypes';

export const initialValues = {
  command: '',
};

export const sendCommandReducer = (
  state = initialValues,
  action: GeneralActionType
) => {
  switch (action.type) {
  case SEND_COMMAND:
    return { command: action.payload };
  default:
    return state;
  }
};
