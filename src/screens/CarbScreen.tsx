import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { FoodList } from '../components/FoodList';
import { Scanner } from '../components/Scanner';
import { SafeAreaView } from 'react-navigation';
import { styles } from '../styles/CarbScreen';
import { View } from 'native-base';

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
      <View>
        <SafeAreaView>
          <SearchBar placeholder={SEARCH_PLACEHOLDER} handleSubmit={this.handleSubmit} />
          <Text>Render List of results for</Text>
          <View style={styles.scrollViewContainer}>
            <ScrollView contentContainerStyle={styles.foodListContainer}>
              <FoodList query={this.state.query} />
            </ScrollView>
          </View>
          <Scanner />
        </SafeAreaView>
      </View>
    );
  }
}
