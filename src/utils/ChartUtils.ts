import { getRecentLogs, getTimesFromLogs } from './ActivityLogUtils';
import { DateUtils } from './DateUtils';
const LEGEND = ['Insulin', 'Glucose', 'CHO'];
const BAR_COLORS = ['blue', 'green', 'orange'];

function getDataBlocks(logs: any) {
  // for each log: [insulin, glucose, cho]
  const dataBlocks: any = [];
  logs.forEach((log: any) => {
    const dataBlock = [log.insulin, log.glucose, log.cho];
    dataBlocks.push(dataBlock);
  });

  return dataBlocks;
}

export function getChartData(logs: any) {
  const recentLogs = getRecentLogs(logs);
  const recentTimes = getTimesFromLogs(recentLogs);
  const labels = DateUtils.parseDateTimesIntoLabels(recentTimes);
  const dataBlocks = getDataBlocks(recentLogs);

  const chartData = {
    labels: labels,
    legend: LEGEND,
    data: dataBlocks,
    barColors: BAR_COLORS,
  };

  return chartData;
}
