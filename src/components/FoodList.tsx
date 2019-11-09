import * as React from 'react';
import { View, Text } from 'react-native';
import { FoodItem } from './FoodItem';

interface FoodListProps {
  query: string;
}

export class FoodList extends React.Component<FoodListProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const foodItems: any = ['item1', 'item2'];

    return (
      <View>
        <Text>{this.props.query}</Text>
        {foodItems.map(function(name: any, index: any) {
          return <FoodItem key={index} name={name}></FoodItem>;
        })}
      </View>
    );
  }
}
