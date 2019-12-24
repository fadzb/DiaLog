import * as React from 'react';
import { View, Text } from 'react-native';
import { FoodItemContainer } from './FoodItemContainer';
import { FoodItem } from '../typings/FoodItem';
import { requestFoods } from '../api/FoodAPI';
import { CarbScreen } from '../screens/CarbScreen';
import { styles } from '../styles/CarbScreen';

interface FoodListProps {
  query: string;
}

export class FoodList extends React.Component<FoodListProps> {
  constructor(props: any) {
    super(props);
  }

  populateFoodItems(query: string) {
    return requestFoods(query);
  }

  render() {
    const { query } = this.props;
    let foodItems: FoodItem[] = [];

    // populate foodItems
    if (query) {
      foodItems = this.populateFoodItems(query);
    }

    return (
      <View>
        <Text>{query}</Text>
        {foodItems.map(function(item: FoodItem, index: any) {
          return <FoodItemContainer item={item} key={index} />;
        })}
      </View>
    );
  }
}
