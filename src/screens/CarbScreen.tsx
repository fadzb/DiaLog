import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { SearchBar } from '../components/SearchBar';
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

  handleSubmit = (search: string) => {
    this.setState({ query: search });
    console.log(search);
  };

  render() {
    console.log('rendering CarbScreen');
    return (
      <ScrollView>
        <SearchBar handleSubmit={this.handleSubmit} />
        <Text>Render List of results</Text>
        <FoodList query={this.state.query} />
      </ScrollView>
    );
  }
}
