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
const screenWidth = Dimensions.get('window').width;

interface ActivityChartProps {}

export class ActivityChart extends React.Component<ActivityChartProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      // legend: ['Rainy Days', 'Sunny Days', 'Snowy Days'], // optional
    };

    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#08130D',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
    };

    return (
      <View>
        <LineChart data={data} width={screenWidth} height={220} chartConfig={chartConfig} />
      </View>
    );
  }
}
