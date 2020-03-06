import * as React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { FoodItem } from '../typings/FoodItem';
import { styles } from '../styles/CarbScreen';
import { requestFoodDetails, parseMoreDetails } from '../api/FoodAPI';
import { FoodItemModal } from './FoodItemModal';
import { View } from 'native-base';

interface FoodItemContainerProps {
  navigation: any;
  item: FoodItem;
  key: string;
  choRatio: string;
  insulinSuggestions: boolean;
}

export class FoodItemContainer extends React.Component<FoodItemContainerProps> {
  modalRef: FoodItemModal | null | undefined;

  constructor(props: any) {
    super(props);
  }

  state = {
    modalVisible: false,
  };

  //send post request and show new screen
  handleClick = () => {
    const { item } = this.props;

    let detailedItem: FoodItem;

    const promise = requestFoodDetails(item.name);

    promise
      .then(responseJson => {
        detailedItem = parseMoreDetails(responseJson);
        // Mutate additional properties for item
        item.cho = detailedItem.cho;
        item.servingUnit = detailedItem.servingUnit;
        item.servingWeight = detailedItem.servingWeight;
        // Open modal
        this.openModal();
      })
      .catch(error => console.log('error', error));
  };

  openModal = () => {
    //If modal has already been opened before, update its state
    if (this.modalRef) {
      this.modalRef.setState({ modalVisible: true });
    }

    this.setState({ modalVisible: true });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick} style={styles.listItemContainer}>
        {this.state.modalVisible && (
          <FoodItemModal
            navigation={this.props.navigation}
            item={this.props.item}
            handleModalClose={this.handleModalClose}
            ref={ref => (this.modalRef = ref)}
            choRatio={this.props.choRatio}
            insulinSuggestions={this.props.insulinSuggestions}
          />
        )}
        <View style={styles.row}>
          <Image source={{ uri: this.props.item.photo_url }} style={{ width: 40, height: 40 }} />
          <Text style={{ fontSize: 22, marginLeft: 20 }}>{this.props.item.name} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
