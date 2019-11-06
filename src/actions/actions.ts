import { ADD_NAME } from './types';

export const addName = (name: any) => {
  return {
    type: ADD_NAME,
    payload: name,
  };
};
