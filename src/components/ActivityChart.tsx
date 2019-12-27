import * as React from 'react';
import { Searchbar } from 'react-native-paper';
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
import { getLogsForDate } from '../utils/ActivityLogUtils';
import { DateUtils } from '../utils/DateUtils';
import { Log } from '../typings/Log';
const SCREEN_WIDTH = Dimensions.get('window').width;

const CHART_CONFIG = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
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

  getTodaysLogs = () => {
    // Getting logs for todays date
    getLogsForDate(DateUtils.getTodaysDateTime())
      .then(logs => this.updateLogs(logs))
      .catch(error => console.log('error here...' + error));
  };

  updateLogs = (logs: any) => {
    this.setState({ logs });
  };

  getRecentTimes(logs: any) {
    // All logged times today
    const times: any = [];
    logs.forEach((log: any) => {
      times.push(log.time);
    });

    // Sort and then get first 10
    const recentTimes = times.sort().splice(0, 3);

    return recentTimes;
  }

  getDataBlocks(logs: any) {
    // for each log: [insulin, glucose, cho]
    const dataBlocks: any = [];
    logs.forEach((log: any) => {
      // const dataBlock = [log.insulin, log.glucose, log.cho];
      const dataBlock = [
        log.insulin + Math.random() * 10,
        log.glucose + Math.random() * 10,
        log.cho + Math.random() * 10,
      ];
      dataBlocks.push(dataBlock);
    });

    return dataBlocks;
  }

  getChartData = (logs: any) => {
    // TODO: Sort logs based on time for all these underneath methods (currently datablocks not adhearing)
    const recentTimes = this.getRecentTimes(logs);
    const labels = DateUtils.parseDateTimesIntoLabels(recentTimes);
    const legend = ['Insulin', 'Glucose', 'CHO'];
    const dataBlocks = this.getDataBlocks(logs);

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
      <View>
        <StackedBarChart
          style={{ margin: 10 }}
          data={this.getChartData(logs)}
          width={SCREEN_WIDTH + 155}
          height={220}
          chartConfig={CHART_CONFIG}
          hideLegend={true}
        />
      </View>
    );
  }
}
