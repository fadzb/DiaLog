import * as React from 'react';
import { View, Text, Image, Modal, Alert } from 'react-native';
import { FoodItem } from '../typings/FoodItem';
import { styles } from '../styles/CarbScreen';
import Button from './Button';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
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

  handleClick = () => {
    // send post request and show new screen
    const { item } = this.props;

    //sends post request to get CHO
    const promise = requestFoodDetails(item.name);

    promise
      .then(responseJson => {
        item.cho = parseFoodItemCHO(responseJson);
        this.setState({ modalVisible: true });
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick} style={styles.item}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 52 }}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
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
