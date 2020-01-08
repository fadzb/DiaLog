import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { FoodList } from '../components/FoodList';
import { SafeAreaView } from 'react-navigation';

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

  handleSubmit = (search: string) => {
    this.setState({ query: search });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <SearchBar placeholder={SEARCH_PLACEHOLDER} handleSubmit={this.handleSubmit} />
          <Text>Render List of results for</Text>
          <FoodList query={this.state.query} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
