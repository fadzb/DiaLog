import * as React from 'react';
import { Colors } from 'react-native-paper';
import { StackedBarChart } from 'react-native-chart-kit';
import { View } from 'native-base';
import { Dimensions } from 'react-native';
import { getLogsForDate, getLogsFromReduxForDate } from '../utils/ActivityLogUtils';
import { DateUtils } from '../utils/DateUtils';
import { getChartData } from '../utils/ChartUtils';
import { Log } from '../typings/Log';
import { styles } from '../styles/ViewActScreen';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
const SCREEN_WIDTH = Dimensions.get('window').width;

const CHART_CONFIG = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: () => Colors.redA100,
  labelColor: () => Colors.black,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.3,
};

interface ActivityChartProps {
  preview: boolean; //reduce chart width for preview

  // Redux state-props
  logs: Log[];
}

export class ActivityChart extends React.Component<ActivityChartProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    logs: [],
  };

  // TODO: Cancel async tasks
  componentWillUnmount = () => {};

  // Un-used
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
    const { preview, logs } = this.props;

    const todaysLogs = getLogsFromReduxForDate(logs, DateUtils.getTodaysDateTime());
    const data = getChartData(todaysLogs);

    return (
      <View style={styles.chartContainer}>
        {/* <StackedBarChart
          style={styles.chart}
          data={data}
          width={preview ? SCREEN_WIDTH - 40 : SCREEN_WIDTH}
          height={220}
          chartConfig={CHART_CONFIG}
          hideLegend={true}
        /> */}

        <Svg height="50%" width="50%" viewBox="0 0 100 100"></Svg>
      </View>
    );
  }
}
