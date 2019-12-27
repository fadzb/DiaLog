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

interface ActivityChartProps {}

export class ActivityChart extends React.Component<ActivityChartProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  render() {
    const line = {
      labels: ['8am', '12am', '4pm', '8pm', '12pm'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99],
          strokeWidth: 2, // optional
        },
      ],
    };
    return (
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={line}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  }
}
