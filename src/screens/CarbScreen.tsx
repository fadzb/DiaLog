import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { FoodList } from '../components/FoodList';
import { Scanner } from '../components/Scanner';
import { SafeAreaView } from 'react-navigation';
import { styles } from '../styles/CarbScreen';
import { View } from 'native-base';

const SEARCH_PLACEHOLDER = 'Search for Food';

interface CarbScreenProps {
  navigation: any;
}

export class CarbScreen extends React.Component<CarbScreenProps> {
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
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <SearchBar placeholder={SEARCH_PLACEHOLDER} handleSubmit={this.handleSubmit} />
          <Text>Render List of results for</Text>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.foodListContainer}>
              <FoodList navigation={this.props.navigation} query={this.state.query} />
            </View>
          </ScrollView>
        </SafeAreaView>
        <Scanner />
      </View>
    );
  }
}
