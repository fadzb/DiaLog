import { ADD_NAME, ADD_LOG, UPDATE_WIDGET } from './types';
import { Log } from '../typings/Log';
import { Widget } from '../typings/Widget';

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

export const updateWidget = (widget: Widget) => {
  return {
    type: UPDATE_WIDGET,
    payload: widget,
  };
};
