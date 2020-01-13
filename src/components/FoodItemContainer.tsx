import * as React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { FoodItem } from '../typings/FoodItem';
import { styles } from '../styles/CarbScreen';
import { parseFoodItemCHO, requestFoodDetails } from '../api/FoodAPI';
import { FoodItemModal } from './FoodItemModal';

interface FoodItemContainerProps {
  navigation: any;
  item: FoodItem;
  key: string;
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

    const promise = requestFoodDetails(item.name);

    promise
      .then(responseJson => {
        item.cho = parseFoodItemCHO(responseJson);
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
          />
        )}
        <Text style={styles.text}>
          {this.props.item.name}{' '}
          <Image
            source={{ uri: this.props.item.photo_url }}
            style={{ width: 40, height: 40, alignSelf: 'flex-end' }}
          />
        </Text>
      </TouchableOpacity>
    );
  }
}
