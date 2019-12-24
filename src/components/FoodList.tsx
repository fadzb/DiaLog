import * as React from 'react';
import { View, Text } from 'react-native';
import { FoodItemContainer } from './FoodItemContainer';
import { FoodItem } from '../typings/FoodItem';
import { requestFoods, parseFoodItems } from '../api/FoodAPI';

interface FoodListProps {
  query: string;
}

export class FoodList extends React.Component<FoodListProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    foodItems: [],
    lastQuery: '',
  };

  // get a promise from food api and handle
  populateFoodItems(query: string) {
    const promise = requestFoods(query);

    promise
      .then(responseJson => {
        this.setState({ lastQuery: this.props.query, foodItems: parseFoodItems(responseJson) });
      })
      .catch(error => console.log('error', error));
  }

  render() {
    const { query } = this.props;

    // populate foodItems... only if the current query is different to last query
    if (this.props.query && this.props.query !== this.state.lastQuery) {
      this.populateFoodItems(this.props.query);
    }

    return (
      <View>
        <Text>{query}</Text>
        {this.state.foodItems.map((item: FoodItem, index: any) => {
          return <FoodItemContainer item={item} key={index} />;
        })}
      </View>
    );
  }
}
