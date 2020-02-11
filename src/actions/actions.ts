import { ADD_NAME, ADD_LOG } from './types';
import { Log } from '../typings/Log';

export const addName = (name: any) => {
  return {
    type: ADD_NAME,
    payload: name,
  };
};

export const addLog = (log: Log) => {
  return {
    type: ADD_LOG,
    payload: log,
  };
};
