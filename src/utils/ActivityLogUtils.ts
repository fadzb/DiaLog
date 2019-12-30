import { asyncGetAllKeys, asyncMultiGetItems } from '../storage/AsyncStorage';
import { DateUtils } from './DateUtils';
import { Log } from '../typings/Log';

// returns a promise containing filtered logs for a selected date
export async function getLogsForDate(dateTime: Date) {
  // Get all keys, then all items, then filter logs
  const promiseLogs = await asyncGetAllKeys()
    .then(keys => asyncMultiGetItems(keys))
    .then(logs => filterByDate(logs, dateTime))
    .catch(error => console.log(error));
  return promiseLogs;
}

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
