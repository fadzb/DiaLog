import * as React from 'react';
import { View, Text } from 'react-native';
import { FoodItemContainer } from './FoodItemContainer';
import { FoodItem } from '../typings/FoodItem';
import { requestFoods, parseFoodItems } from '../api/FoodAPI';
import { CarbScreen } from '../screens/CarbScreen';
import { styles } from '../styles/CarbScreen';

interface FoodListProps {
  query: string;
}

export class FoodList extends React.Component<FoodListProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    foodItems: [],
  };

  // get a promise from food api and handle
  populateFoodItems(query: string) {
    const promise = requestFoods(query);

    promise
      .then(responseJson => {
        this.setState({ foodItems: parseFoodItems(responseJson) });
      })
      .catch(error => console.log('error', error));
  }

  render() {
    const { query } = this.props;
    // let foodItems: FoodItem[] = [];

    // populate foodItems
    if (query) {
      this.populateFoodItems(query);
    }

    return (
      <View>
        <Text>{query}</Text>
        {this.state.foodItems.map(function(item: FoodItem, index: any) {
          return <FoodItemContainer item={item} key={index} />;
        })}
      </View>
    );
  }
}
