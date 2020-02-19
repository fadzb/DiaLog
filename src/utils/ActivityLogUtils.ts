import { asyncGetAllKeys, asyncMultiGetItems } from '../storage/AsyncStorage';
import { DateUtils } from './DateUtils';
import { Log } from '../typings/Log';

// gets logs for date from redux store (no direct AsyncStorage API call)
export function getLogsFromReduxForDate(logs: Log[], dateTime: Date) {
  const logsToReturn = filterByDateForRedux(logs, dateTime);

  return logsToReturn;
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
    return a.time - b.time;
  };
  const sortedLogs = logs.sort(byDate).slice(0);

  return sortedLogs;
}

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
