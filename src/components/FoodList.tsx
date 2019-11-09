import * as React from 'react';
import { View, Text } from 'react-native';
import { FoodItemContainer } from './FoodItemContainer';
import { FoodItem } from '../typings/FoodItem';

interface FoodListProps {
  query: string;
}

export class FoodList extends React.Component<FoodListProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const item1: FoodItem = {
      name: 'carrot',
      cho: '8.5g',
    };

    const item2: FoodItem = {
      name: 'apple',
      cho: '10g',
    };
    const foodItems: FoodItem[] = [item1, item2];

    return (
      <View>
        <Text>{this.props.query}</Text>
        {foodItems.map(function(item: FoodItem, index: any) {
          return <FoodItemContainer item={item} key={index} />;
        })}
      </View>
    );
  }
}
