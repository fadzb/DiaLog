import * as React from 'react';
import { Image } from 'react-native';
import { View, Text, Button } from 'native-base';
import { styles } from '../styles/CarbScreen';
import { FoodItem } from '../typings/FoodItem';
import Modal from 'react-native-modal';
import { DAFNESuggestion } from './DAFNESuggestion';
import { suggestInsulinDose } from '../utils/CarbCounting';

interface FoodItemModalProps {
  navigation: any;
  item: FoodItem;
  handleModalClose: () => void;
  choRatio: number;
  insulinSuggestions: boolean;
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
        onBackdropPress={this.handleClose}
        style={styles.modalContent}
        isVisible={this.state.modalVisible}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
      >
        <View>
          {/* Row with Image and Item name */}
          <View style={styles.row}>
            <Image source={{ uri: this.props.item.photo_url }} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 30, marginLeft: 20 }}>{this.props.item.name}</Text>
            <View style={{ marginLeft: 'auto' }}>
              {this.props.insulinSuggestions && (
                <DAFNESuggestion>
                  {suggestInsulinDose(Number(this.props.item.cho), this.props.choRatio)}
                </DAFNESuggestion>
              )}
            </View>
          </View>

          {/* Nutrtional info */}
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Carbohydrate: {this.props.item.cho}g</Text>
            <Text>Serving Unit: {this.props.item.servingUnit}</Text>
            <Text>Serving Weight: {this.props.item.servingWeight}g</Text>
          </View>

          {/* Action buttons */}
          <View style={styles.rowSpaced}>
            <Button onPress={this.addLog}>
              <Text style={{ fontWeight: 'bold' }}>Add Log</Text>
            </Button>
            <Button warning onPress={this.handleClose}>
              <Text style={{ fontWeight: 'bold' }}>Cancel</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
