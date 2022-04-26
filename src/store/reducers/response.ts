import { GeneralActionType } from '../../interfaces';
import { GET_RESPONSE, SET_PLAYING } from '../actionTypes';

export const initialValues = {
  response: '',
  playing: true
};

export const responseReducer = (
  state = initialValues,
  action: GeneralActionType
) => {
  switch (action.type) {
  case GET_RESPONSE:
    return { response: action.payload, playing: false };
  case SET_PLAYING: 
    return {playing: action.payload};
  default:
    return state;
  }
};