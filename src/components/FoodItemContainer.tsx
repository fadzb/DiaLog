import * as React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { FoodItem } from '../typings/FoodItem';
import { styles } from '../styles/CarbScreen';
import { parseFoodItemCHO, requestFoodDetails } from '../api/FoodAPI';
import { FoodItemModal } from './FoodItemModal';
import Modal from 'react-native-modal';

interface FoodItemContainerProps {
  item: FoodItem;
  key: string;
}

export class FoodItemContainer extends React.Component<FoodItemContainerProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    modalVisible: false,
  };

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  //send post request and show new screen
  handleClick = () => {
    const { item } = this.props;

    const promise = requestFoodDetails(item.name);

    promise
      .then(responseJson => {
        item.cho = parseFoodItemCHO(responseJson);
        this.setState({ modalVisible: true });
      })
      .catch(error => console.log('error', error));
  };

  handleModalClose = () => {
    this.setModalVisible(false);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick} style={styles.listItemContainer}>
        <View style={{ marginTop: 52 }}>
          <FoodItemModal item={this.props.item} handleModalClose={this.handleModalClose} />
        </View>
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
