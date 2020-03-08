import * as React from 'react';
import { Colors } from 'react-native-paper';
import { StackedBarChart } from 'react-native-chart-kit';
import { View } from 'native-base';
import { Dimensions, SafeAreaView } from 'react-native';
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
import { scaleTime, scaleLinear, scaleQuantile } from 'd3-scale';
import * as shape from 'd3-shape';

const horizontalPadding = 5;
const innerHorizontalPadding = 10;
const SCREEN_WIDTH = Dimensions.get('window').width - horizontalPadding;
const height = 200;
const verticalPadding = 5;

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

// x-axis: TIME, y-axis: GLUCOSE VALUE
const data = [
  { x: new Date() - 1000, y: 10 },
  { x: new Date() - 1000 * 60 * 60, y: 20 },
  { x: new Date() - 1000 * 60 * 60 * 3, y: 10 },
  { x: new Date() - 1000 * 60 * 60 * 7, y: 15 },
  { x: new Date() - 1000 * 60 * 60 * 11, y: 5 },
];

// Scale x from -12 hours to now
const oneDayInMS = 86400000;
const endX = DateUtils.getTodaysDateTime();
const startX = endX - oneDayInMS / 2;

const scaleX = scaleTime()
  .domain([startX, endX])
  .range([0 + innerHorizontalPadding, SCREEN_WIDTH - innerHorizontalPadding]);
const scaleY = scaleLinear()
  .domain([0, 30])
  .range([height - verticalPadding, verticalPadding]);

const line = shape
  .line()
  .x((d: any) => scaleX(d.x))
  .y((d: any) => scaleY(d.y))
  .curve(shape.curveCardinal.tension(-0.5))(data);

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
    // const data = getChartData(todaysLogs);
    console.log(new Date(startX));

    return (
      <View
        style={{
          marginTop: 5,
          borderWidth: 1,
          width: SCREEN_WIDTH,
          height: height,
          alignSelf: 'center',
        }}
      >
        <Svg height={height} width={SCREEN_WIDTH}>
          <Path d={line} fill="transparent" stroke="#367be2" strokeWidth={3} />

          {data.map((dataPoint, index) => {
            return (
              <Circle
                cx={scaleX(dataPoint.x)}
                cy={scaleY(dataPoint.y)}
                r="7"
                fill="green"
                key={index}
              />
            );
          })}
        </Svg>
      </View>
    );
  }
}
