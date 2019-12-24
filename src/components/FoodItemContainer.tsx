import * as React from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { FoodItem } from '../typings/FoodItem';
import { styles } from '../styles/CarbScreen';
import { parseFoodItemCHO, requestFoodDetails } from '../api/FoodAPI';

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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.handleModalClose}
        >
          <View style={{ marginTop: 52 }}>
            <View>
              <TouchableOpacity style={styles.button} onPress={this.handleModalClose}>
                <Text>Back to Search</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.text}>
              {this.props.item.name}
              <Image
                source={{ uri: this.props.item.photo_url }}
                style={{ width: 40, height: 40, alignSelf: 'flex-end' }}
              />
              {this.props.item.cho}
            </Text>
          </View>
        </Modal>
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
