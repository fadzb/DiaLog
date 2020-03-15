// Using design ideas from revolut chart:

import * as React from 'react';
import { View } from 'native-base';
import { Dimensions } from 'react-native';
import {
  getLogsForDate,
  getLogsFromReduxForDate,
  getLogsFromLastxHours,
} from '../utils/ActivityLogUtils';
import { DateUtils } from '../utils/DateUtils';
import { Log } from '../typings/Log';
import { styles } from '../styles/ViewActScreen';
import Svg, {
  Circle,
  G,
  Text,
  Path,
  Line,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { scaleTime, scaleLinear } from 'd3-scale';
import * as shape from 'd3-shape';
import * as path from 'svg-path-properties';
import { getIcon } from '../utils/IconUtils';

const horizontalPadding = 5;
const innerHorizontalPadding = 10;
const outerVerticalPadding = 10; //To allow space for svg line labels (timestamps)
const SCREEN_WIDTH = Dimensions.get('window').width - horizontalPadding;
const height = 200;
const verticalPadding = 5;
const maxGlucose = 30;
const timeSpan = 12; // Show logs over last x hours
const legendOffsetX = 70; //Padding for legend
const legendOffsetY = 20;

// Scale x from -12 hours to now
const oneDayInMS = 86400000;
const endX = DateUtils.getTodaysDateTime();
const startX = endX - oneDayInMS / 2;

// const scaleX = scaleTime()
//   .domain([startX, endX])
//   .range([0 + innerHorizontalPadding, SCREEN_WIDTH - innerHorizontalPadding]);
// const scaleY = scaleLinear()
//   .domain([0, maxGlucose])
//   .range([height - verticalPadding, verticalPadding]);

const invert = (yPosition: number) => {
  return height - yPosition;
};

interface ActivityChartProps {
  preview: boolean; //reduce chart width for preview
  logs: Log[];
  onSelectLog: (log: Log) => void;
  navigation: any;
}

export class ActivityChart extends React.Component<ActivityChartProps> {
  SCREEN_WIDTH = this.props.preview ? SCREEN_WIDTH - 20 : SCREEN_WIDTH;
  navigationWillFocusListener: any;

  constructor(props: any) {
    super(props);

    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      // do something like this.setState() to update your view
      this.handleFocus();
    });
  }

  state = {
    logs: [],
    selectedLog: {},
  };

  handleFocus = () => {
    this.setState({ selectedLog: null });
  };

  scaleX = scaleTime()
    .domain([startX, endX])
    .range([0 + innerHorizontalPadding, this.SCREEN_WIDTH - innerHorizontalPadding]);

  scaleY = scaleLinear()
    .domain([0, maxGlucose])
    .range([height - verticalPadding, verticalPadding]);

  // Remove listener
  componentWillUnmount() {
    this.navigationWillFocusListener.remove();
  }

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

  //Get glucose data from logs and make suitable for svg
  getData = (logs: Log[]) => {
    const data: any = [];

    logs.forEach(log => {
      if (Number(log.glucose) > 0) {
        data.push({ x: log.time, y: log.glucose, log: log });
      }
    });

    return data;
  };

  getTimeStamps = () => {
    //get current time
    const dateTimeNow = DateUtils.getTodaysDateTime();
    const hoursNow = dateTimeNow.getHours() + 1; // Add 1-hour padding

    //return a list starting at 12 hours ago and ending at current hour
    const timeStamps = [];
    for (let i = timeSpan; i > 0; i--) {
      timeStamps.push(hoursNow - i);
    }

    return timeStamps;
  };

  shouldRenderTimeStamp = (timeStamp: number) => {
    if (timeStamp % 3 == 0) {
      return true;
    }
    return false;
  };

  createGridLines = () => {
    let gridLines = [];
    const timeStamps = this.getTimeStamps();

    for (let i = 0; i < timeSpan; i++) {
      // X varies from starting x (i=0) to last x (i=12) => 12 lines
      const x = (this.SCREEN_WIDTH / timeSpan) * i;

      gridLines.push(
        <G key={`G-lines-${i}`}>
          <Line
            x1={x}
            y1="0"
            x2={x}
            y2={height}
            stroke="black"
            strokeWidth="0.3"
            key={`grindLine-${i}`}
          />
          {/* Only render timestamp every 3 hours */}
          {this.shouldRenderTimeStamp(timeStamps[i]) && (
            <Text x={x} y={height + outerVerticalPadding} key={`timeStamp-${i}`}>
              {`${timeStamps[i]}:00`}
            </Text>
          )}
        </G>,
      );
    }

    return gridLines;
  };

  // Y-axis labels
  createGridLabels = () => {
    let gridLabels = [];
    const numLabels = 6;

    // Split it 6 times
    for (let i = 0; i < numLabels; i++) {
      const y = (height / numLabels) * i;

      gridLabels.push(
        <G key={`G-labels-${i}`}>
          <Line
            x1={0}
            y1={y}
            x2={this.SCREEN_WIDTH}
            y2={y}
            stroke="black"
            strokeWidth="0.3"
            key={`grindLine-${i}`}
          />
          {/* Only render timestamp every 3 hours */}
          {true && (
            <Text x={0} y={y} key={`timeStamp-${i}`}>
              {`${maxGlucose - (i * maxGlucose) / numLabels}`}
            </Text>
          )}
        </G>,
      );
    }

    return gridLabels;
  };

  createPoints = (logs: Log[]) => {
    const points: any = [];

    logs.forEach(log => {
      // Food
      if (log.cho > 0) {
        points.push(
          <G
            key={`food-point-${log.cho}-${log.time}`}
            x={this.scaleX(log.time)}
            y={this.scaleY(log.cho)}
          >
            {this.state.selectedLog == log && <Circle r="10" fill="red"></Circle>}
            <Circle r="7" fill="orange" onPress={() => this.selectLog(log)} />
            <Text>Food</Text>
          </G>,
        );
      }

      // Insulin
      if (log.insulin > 0) {
        points.push(
          <G
            key={`insulin-point-${log.insulin}-${log.time}`}
            x={this.scaleX(log.time)}
            y={this.scaleY(log.insulin)}
          >
            {this.state.selectedLog == log && <Circle r="10" fill="red"></Circle>}
            <Circle r="7" fill="blue" onPress={() => this.selectLog(log)} />
            <Text>Insulin</Text>
          </G>,
        );
      }
    });

    return points;
  };

  selectLog = (log: Log) => {
    this.setState({ selectedLog: log });
    this.props.onSelectLog(log);
  };

  line = (data: any) =>
    shape
      .line()
      .x((d: any) => this.scaleX(d.x))
      .y((d: any) => this.scaleY(d.y))
      .curve(shape.curveCardinal.tension(0))(data);

  render() {
    const { preview, logs } = this.props;
    const recentLogs = logs && getLogsFromLastxHours(logs, timeSpan);
    const data = recentLogs && this.getData(recentLogs);
    const line = data.length > 0 && this.line(data);
    const properties = line && path.svgPathProperties(line);
    let startPoint = { x: 0, y: 0 };
    if (properties) {
      startPoint =
        properties.getTotalLength() > 0
          ? properties.getPointAtLength(0)
          : { x: this.scaleX(data[0].x), y: this.scaleY(data[0].y) };
    }
    const { x: startX, y: startY } = startPoint;

    return (
      <View
        style={{
          marginTop: 5,
          marginBottom: 50,
          borderWidth: 1,
          width: this.SCREEN_WIDTH,
          height: height,
          alignSelf: 'center',
        }}
      >
        <Svg height={height + outerVerticalPadding} width={this.SCREEN_WIDTH}>
          {/* Using revolut chart gradient */}
          <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
              <Stop stopColor="#CDE3F8" offset="0%" />
              <Stop stopColor="#eef6fd" offset="80%" />
              <Stop stopColor="#FEFFFF" offset="100%" />
            </LinearGradient>
          </Defs>

          {/* Grid */}
          {this.createGridLines()}
          {this.createGridLabels()}

          {/* Legend */}
          <G x={this.SCREEN_WIDTH - legendOffsetX} y={legendOffsetY}>
            <Circle x={-10} y={-5} r="7" fill="green" />
            <Text>Glucose</Text>
          </G>
          <G x={this.SCREEN_WIDTH - legendOffsetX} y={legendOffsetY + 15}>
            <Circle x={-10} y={-5} r="7" fill="blue" />
            <Text>Insulin</Text>
          </G>
          <G x={this.SCREEN_WIDTH - legendOffsetX} y={legendOffsetY + 30}>
            <Circle x={-10} y={-5} r="7" fill="orange" />
            <Text>Food</Text>
          </G>

          {/* Smooth Line */}
          {properties && properties.getTotalLength() > 0 && (
            <Path
              d={`${line} V ${height} ${height - verticalPadding} L ${startX} ${height -
                verticalPadding} L ${startX} ${startY} `}
              stroke="green"
              strokeWidth={3}
              fill="url(#gradient)"
            />
          )}

          {/* Data Points */}
          {data.map((dataPoint: any, index: any) => {
            return (
              <G
                key={`glucose-point-${dataPoint.glucose}-${dataPoint.x}`}
                x={this.scaleX(dataPoint.x)}
                y={this.scaleY(dataPoint.y)}
              >
                {this.state.selectedLog == dataPoint.log && <Circle r="10" fill="red"></Circle>}
                <Circle
                  r="7"
                  fill="green"
                  key={index}
                  onPress={() => this.selectLog(dataPoint.log)}
                />
              </G>
            );
          })}

          {/* Other Activities */}
          {this.createPoints(recentLogs)}
        </Svg>
      </View>
    );
  }
}
