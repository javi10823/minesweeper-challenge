import { GeneralActionType } from '../../interfaces';
import { GET_RESPONSE } from '../actionTypes';

export const initialValues = {
  response: '',
};

export const responseReducer = (
  state = initialValues,
  action: GeneralActionType
) => {
  switch (action.type) {
  case GET_RESPONSE:
    return { response: action.payload };
  default:
    return state;
  }
};