import * as React from 'react';
import { Image, Alert, TouchableOpacity } from 'react-native';
import { View, Text, Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { styles } from '../styles/CarbScreen';
import { FoodItem } from '../typings/FoodItem';
import Modal from 'react-native-modal';

interface FoodItemModalProps {
  item: FoodItem;
  handleModalClose: () => void;
}

export class FoodItemModal extends React.Component<FoodItemModalProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Modal
        style={styles.modalContent}
        isVisible={this.state.modalVisible}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
      >
        <View style={{}}>
          <Text style={styles.text}>
            {this.props.item.name}
            <Image
              source={{ uri: this.props.item.photo_url }}
              style={{ width: 40, height: 40, alignSelf: 'flex-end' }}
            />
          </Text>
          <Text>CHO: {this.props.item.cho}</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.props.handleModalClose}>
              <Text>Back to Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
