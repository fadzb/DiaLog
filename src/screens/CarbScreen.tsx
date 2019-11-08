import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

export class CarbScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  handleSearchBar = (query: string) => {
    this.setState({ firstQuery: query });
  };

  render() {
    return (
      <View>
        <Searchbar placeholder="Search" onChangeText={this.handleSearchBar} value={''} />
      </View>
    );
  }
}
