import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FoodList } from '../components/FoodList';
import { styles } from '../styles/CarbScreen';

const SEARCH_PLACEHOLDER = 'Search for Food';

interface SearchBarProps {
  handleSubmit: (search: string) => void;
}

export class SearchBar extends React.Component<SearchBarProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    search: '',
  };

  handleSearchBar = (search: string) => {
    this.setState({ search });
  };

  handleSubmit = (e: any) => {
    //not handling submit differently atm
    this.props.handleSubmit(this.state.search);
  };

  render() {
    return (
      <Searchbar
        placeholder={SEARCH_PLACEHOLDER}
        onChangeText={this.handleSearchBar}
        onSubmitEditing={this.handleSubmit}
        value={this.state.search}
      />
    );
  }
}
