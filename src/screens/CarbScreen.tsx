import * as React from 'react';
import { View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FoodList } from '../components/FoodList';

const SEARCH_PLACEHOLDER = 'Search for Food';

export class CarbScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  state = {
    query: '',
  };

  handleSearchBar = (query: string) => {
    this.setState({ query });
  };

  handleSubmit = () => {
    console.log(this.state.query);
  };

  render() {
    return (
      <View>
        <Searchbar
          placeholder={SEARCH_PLACEHOLDER}
          onChangeText={this.handleSearchBar}
          onSubmitEditing={this.handleSubmit}
          value={this.state.query}
        />
        <Text>Render List of results</Text>
        <FoodList query={this.state.query} />
      </View>
    );
  }
}
