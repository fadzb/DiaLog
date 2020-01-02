import * as React from 'react';
import { Colors } from 'react-native-paper';
import { StackedBarChart } from 'react-native-chart-kit';
import { View } from 'native-base';
import { Dimensions } from 'react-native';
import { getLogsForDate } from '../utils/ActivityLogUtils';
import { DateUtils } from '../utils/DateUtils';
import { getChartData } from '../utils/ChartUtils';
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
      .then(logs => this.updateLogs(logs || []))
      .catch(error => console.log('Error Getting Todays Logs.' + error));
  };

  updateLogs = (logs: Log[]) => {
    this.setState({ logs });
  };

  render() {
    const { logs } = this.state;

    return (
      <View style={{ margin: 5, borderWidth: 1 }}>
        <StackedBarChart
          style={{ margin: 0 }}
          data={getChartData(logs)}
          width={SCREEN_WIDTH}
          height={220}
          chartConfig={CHART_CONFIG}
          hideLegend={false}
        />
      </View>
    );
  }
}
