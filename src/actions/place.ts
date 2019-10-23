import { ADD_PLACE } from './types';

export const addPlace = (placeName: any) => {
  return {
    type: ADD_PLACE,
    payload: placeName,
  };
};
