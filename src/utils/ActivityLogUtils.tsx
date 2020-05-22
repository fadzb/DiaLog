import * as React from 'react';
import { asyncGetAllKeys, asyncMultiGetItems } from '../storage/AsyncStorage';
import { DateUtils } from './DateUtils';
import { Log } from '../typings/Log';
import { FoodItem } from '../typings/FoodItem';
import { Text } from 'native-base';
import { GLOBAL } from '../styles/global';
import { G } from 'react-native-svg';

export function getLogHeader(log: Log) {
  const timeLabel = DateUtils.parseDateTimeIntoLabel(log.time);

  // If today
  if (DateUtils.sameDay(log.time, new Date())) {
    return (
      <Text>
        Today at {timeLabel} : {getTypes(log)}
      </Text>
    );
  }
  // yesterday
  else if (DateUtils.sameDay(log.time, DateUtils.getDayXdaysAgo(1))) {
    return (
      <Text>
        Yesterday at {timeLabel} : {getTypes(log)}
      </Text>
    );
  } else {
    return (
      <Text>
        {DateUtils.parseDateTimeIntoDateLabel(log.time)} : {getTypes(log)}
      </Text>
    );
  }
}

export function makeNotesFromItem(item: FoodItem) {
  let notes = '';

  notes += `Food: ${item.name} \n`;
  notes += `Serving Size: ${item.serving_qty} ${item.servingUnit}`;

  return notes;
}

// get activity types
export function getType(log: Log) {
  let type = '';
  let count = 0;

  log.cho && (type += 'Food ') && count++;
  log.insulin && (count ? (type += '/ Insulin ') : (type += 'Insulin ') && count++);
  log.glucose && (count ? (type += '/ Glucose ') : (type += 'Glucose ') && count++);

  return type;
}

// get activity typess
export function getTypes(log: Log) {
  let types = [];

  log.cho &&
    types.push(
      <Text key={'food'} style={[GLOBAL.types, { color: 'orange' }]}>
        {' '}
        Food{' '}
      </Text>,
    );
  log.insulin &&
    types.push(
      <Text key={'insulin'} style={[GLOBAL.types, { color: 'blue' }]}>
        {' '}
        Insulin{' '}
      </Text>,
    );
  log.glucose &&
    types.push(
      <Text key={'glucose'} style={[GLOBAL.types, { color: 'green' }]}>
        {' '}
        Glucose{' '}
      </Text>,
    );

  return types;
}

// gets logs for date from redux store (no direct AsyncStorage API call)
export function getLogsFromReduxForDate(logs: Log[], dateTime: Date) {
  const logsToReturn = filterByDateForRedux(logs, dateTime);

  return logsToReturn;
}

export function getLogsFromLastxHours(logs: Log[], lastxHours: number) {
  const logsToReturn: Log[] = [];

  logs.forEach((log: Log) => {
    log.time = new Date(log.time); // Uncommenting for now (FIXME: MIGHT BREAK SOMETHING)

    // Check difference between date of log and now
    const differenceInMS = new Date().getTime() - log.time.getTime();
    const differenceInHours = Math.floor(differenceInMS / 1000 / 60 / 60);

    if (differenceInHours <= lastxHours) {
      logsToReturn.push(log);
    }
  });

  return sortByDateAscending(logsToReturn);
}

// UNUSED (Used only for AsyncStorate API)
// returns a promise containing filtered logs for a selected date
export async function getLogsForDate(dateTime: Date) {
  // Get all keys, then all items, then filter logs
  const promiseLogs = await asyncGetAllKeys()
    .then(keys => asyncMultiGetItems(keys))
    .then(logs => filterByDate(logs, dateTime))
    .catch(error => console.log(error));
  return promiseLogs;
}

// For redux api
function filterByDateForRedux(items: any, dateTime: Date) {
  const logs: Log[] = [];

  items.forEach((item: any) => {
    const log: Log = item;
    log.time = new Date(log.time);

    if (DateUtils.sameDay(log.time, dateTime)) {
      logs.push(log);
    }
  });

  return logs;
}

// UNUSED: for AysncStorage
function filterByDate(items: any, dateTime: Date) {
  const logs: Log[] = [];

  items.forEach((item: any) => {
    const log: Log = item.value;
    log.time = new Date(log.time);

    if (DateUtils.sameDay(log.time, dateTime)) {
      logs.push(log);
    }
  });

  return logs;
}

export function sortByDateAscending(logs: Log[]) {
  const byDate = (a: any, b: any) => {
    return new Date(a.time) - new Date(b.time);
  };
  const sortedLogs = logs.sort(byDate).slice(0);

  return sortedLogs;
}

export function sortByDateDescending(logs: Log[]) {
  const byDate = (a: any, b: any) => {
    return new Date(b.time) - new Date(a.time);
  };
  const sortedLogs = logs.sort(byDate).slice(0);

  return sortedLogs;
}

// UNUSED
export function getRecentLogs(logs: any, amount: number) {
  const sortedLogs = sortByDateAscending(logs);
  const startIndex = sortedLogs.length > amount ? sortedLogs.length - amount : 0;
  const recentLogs = sortedLogs.slice(startIndex);

  return recentLogs;
}

export function getTimesFromLogs(logs: any) {
  const times: any = [];
  logs.forEach((log: any) => {
    times.push(log.time);
  });

  return times;
}
