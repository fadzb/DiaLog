import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

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
          placeholder="Search"
          onChangeText={this.handleSearchBar}
          onSubmitEditing={this.handleSubmit}
          value={this.state.query}
        />
      </View>
    );
  }
}
