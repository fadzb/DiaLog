import * as React from 'react';
import { Searchbar, Colors } from 'react-native-paper';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { View, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { getLogsForDate, sortByDateAscending } from '../utils/ActivityLogUtils';
import { DateUtils } from '../utils/DateUtils';
import { Log } from '../typings/Log';
const SCREEN_WIDTH = Dimensions.get('window').width;

const CHART_CONFIG = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => Colors.redA100,
  labelColor: (opacity = 1) => Colors.black,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

interface ActivityChartProps {}

export class ActivityChart extends React.Component<ActivityChartProps> {
  constructor(props: any) {
    super(props);

    this.getTodaysLogs();
  }

  state = {
    logs: [],
  };

  // TODO: Cancel async tasks
  componentWillUnmount = () => {};

  getTodaysLogs = () => {
    // Getting logs for todays date
    getLogsForDate(DateUtils.getTodaysDateTime())
      .then(logs => this.updateLogs(logs))
      .catch(error => console.log('error here...' + error));
  };

  updateLogs = (logs: any) => {
    this.setState({ logs });
  };

  getRecentLogs(logs: any) {
    //Sort All of todays logs
    const sortedLogs = sortByDateAscending(logs);

    //Only want to return the most recent 5
    const recentLogs = sortedLogs.splice(sortedLogs.length - 5);

    recentLogs.forEach((log: any) => {
      console.log(log);
    });

    return recentLogs;
  }

  getTimesFromLogs(logs: any) {
    const times: any = [];
    logs.forEach((log: any) => {
      times.push(log.time);
    });

    return times;
  }

  getDataBlocks(logs: any) {
    // for each log: [insulin, glucose, cho]
    const dataBlocks: any = [];
    logs.forEach((log: any) => {
      const dataBlock = [log.insulin, log.glucose, log.cho];
      dataBlocks.push(dataBlock);
    });

    return dataBlocks;
  }

  getChartData = (logs: any) => {
    const recentLogs = this.getRecentLogs(logs);
    const recentTimes = this.getTimesFromLogs(recentLogs);
    const labels = DateUtils.parseDateTimesIntoLabels(recentTimes);
    const legend = ['Insulin', 'Glucose', 'CHO'];
    const dataBlocks = this.getDataBlocks(recentLogs);

    const chartData = {
      labels: labels,
      legend: legend,
      data: dataBlocks,
      barColors: ['blue', 'orange', 'green'],
    };

    return chartData;
  };

  render() {
    const { logs } = this.state;

    return (
      <View style={{ margin: 5, borderWidth: 1 }}>
        <StackedBarChart
          style={{ margin: 0 }}
          data={this.getChartData(logs)}
          width={SCREEN_WIDTH}
          height={220}
          chartConfig={CHART_CONFIG}
          hideLegend={false}
        />
      </View>
    );
  }
}
