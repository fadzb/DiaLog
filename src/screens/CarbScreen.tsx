import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FoodList } from '../components/FoodList';
import { styles } from '../styles/CarbScreen';

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

  handleSubmit = (e: any) => {
    //not handling submit differently atm
  };

  render() {
    return (
      <ScrollView>
        <Searchbar
          placeholder={SEARCH_PLACEHOLDER}
          onChangeText={this.handleSearchBar}
          onSubmitEditing={this.handleSubmit}
          value={this.state.query}
        />
        <Text>Render List of results</Text>
        <FoodList query={this.state.query} />
      </ScrollView>
    );
  }
}
