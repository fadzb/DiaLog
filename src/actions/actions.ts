import { ADD_NAME, ADD_LOG, UPDATE_WIDGET, CLEAR_LOGS, ADD_CHANNEL_KEY } from './types';
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

export const clearLogs = () => {
  return {
    type: CLEAR_LOGS,
  };
};

export const addChannelKey = (key: string) => {
  return {
    type: ADD_CHANNEL_KEY,
    payload: key,
  };
};
