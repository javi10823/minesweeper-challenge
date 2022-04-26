import { GET_RESPONSE } from '../actionTypes';

export const response = (response: string) => ({
  type: GET_RESPONSE,
  payload: response,
});
