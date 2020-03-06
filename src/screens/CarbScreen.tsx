import * as React from 'react';
import { ScrollView } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { FoodList } from '../components/FoodList';
import { Scanner } from '../components/Scanner';
import { SafeAreaView } from 'react-navigation';
import { styles } from '../styles/CarbScreen';
import { View } from 'native-base';
import { MLKitLabels } from '../components/MLKitLabels';
import { connect } from 'react-redux';
import { setChoRatio } from '../actions/actions';

const SEARCH_PLACEHOLDER = 'Search for Food';

interface CarbScreenProps {
  navigation: any;
  choRatio: number;
  insulinSuggestions: boolean;
  setChoRatio: (ratio: number) => void;
}

class CarbScreen extends React.Component<CarbScreenProps> {
  foodListRef: any;

  constructor(props: any) {
    super(props);
  }

  state = {
    query: '',
    labels: [],
  };

  handleSearchBar = (query: string) => {
    this.setState({ query });
  };

  handleSubmit = (search: string) => {
    this.setState({ query: search });
  };

  clearFoodList = () => {
    this.setState({ query: '' });
  };

  // Image classified, show label options to user
  handleLabels = (labels: string[]) => {
    this.setState({ labels: labels });
  };

  // Label selected -> Search for it
  handleLabelPress = (label: string) => {
    // Update search
    this.handleSubmit(label);
    // Close labels
    this.handleCloseLabels();
  };

  handleCloseLabels = () => {
    this.setState({ labels: [] });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <SearchBar
            placeholder={SEARCH_PLACEHOLDER}
            handleSubmit={this.handleSubmit}
            handleClear={this.clearFoodList}
            value={this.state.query}
          />
          {this.state.labels.length > 0 && (
            <MLKitLabels
              labels={this.state.labels}
              onPress={this.handleLabelPress}
              closeLabels={this.handleCloseLabels}
            />
          )}
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.foodListContainer}>
              <FoodList
                ref={ref => (this.foodListRef = ref)}
                navigation={this.props.navigation}
                query={this.state.query}
                choRatio={this.props.choRatio}
                insulinSuggestions={this.props.insulinSuggestions}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        <Scanner
          navigation={this.props.navigation}
          updateLabels={this.handleLabels}
          choRatio={this.props.choRatio}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    widgets: state.widgets,
    logs: state.logs,
    choRatio: state.choRatio,
    insulinSuggestions: state.insulinSuggestions,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setChoRatio: (ratio: number) => {
      dispatch(setChoRatio(ratio));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarbScreen);
