import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import { styles } from '../styles/CarbScreen';
import { FoodItem } from '../typings/FoodItem';
import Modal from 'react-native-modal';

interface FoodItemModalProps {
  navigation: any;
  item: FoodItem;
  handleModalClose: () => void;
}

export class FoodItemModal extends React.Component<FoodItemModalProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    modalVisible: true,
  };

  //When component is first mounted, it remains mounted even after closed to allow for slideOut animation
  handleClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  addLog = () => {
    // Navigate to Log Act Screen with props (Food Item)
    this.props.navigation.navigate('LogAct', { item: this.props.item });
    // Unfortunately, this does not unmount previously mounted components so some memory leak here
    // TODO: Should be handling navigation using redux ( instead of passing callback down through props )
    // TODO: Should be subscribing to navigation events and unmounting appropriately
    this.handleClose();
  };

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
          <Text>CHO: {this.props.item.cho}g</Text>
          <View>
            <Button primary style={{ margin: 10 }} onPress={this.addLog}>
              <Text>Add Log</Text>
            </Button>
            <TouchableOpacity style={styles.button} onPress={this.handleClose}>
              <Text>Back to Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
