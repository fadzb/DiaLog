import {
  ADD_NAME,
  ADD_LOG,
  UPDATE_WIDGET,
  CLEAR_LOGS,
  ADD_CHANNEL_KEY,
  SET_CHO_RATIO,
  SET_INSULIN_SUGGESTIONS,
  UPDATE_MESSAGES_IN_CHANNEL,
  UPDATE_MESSAGES_SEEN,
} from './types';
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

export const setChoRatio = (ratio: number) => {
  return {
    type: SET_CHO_RATIO,
    payload: ratio,
  };
};

export const setInsulinSuggestions = (value: boolean) => {
  return {
    type: SET_INSULIN_SUGGESTIONS,
    payload: value,
  };
};

export const updateMessagesInChannel = (newMessages: number) => {
  return {
    type: UPDATE_MESSAGES_IN_CHANNEL,
    payload: newMessages,
  };
};

export const updateMessagesSeen = (number: number) => {
  return {
    type: UPDATE_MESSAGES_SEEN,
    payload: number,
  };
};
