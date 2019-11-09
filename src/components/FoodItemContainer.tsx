import * as React from 'react';
import { View, Text } from 'react-native';
import { FoodItem } from '../typings/FoodItem';

interface PropTypes {
  item: FoodItem;
  key: string;
}

export class FoodItemContainer extends React.Component<PropTypes> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.item.name} {this.props.item.cho}
        </Text>
      </View>
    );
  }
}
