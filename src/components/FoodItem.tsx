import * as React from 'react';
import { View, Text } from 'react-native';

interface FoodItemProps {
  item: any;
}

export class FoodItem extends React.Component<FoodItemProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}
