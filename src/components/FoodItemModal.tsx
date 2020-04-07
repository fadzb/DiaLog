import * as React from 'react';
import { Image } from 'react-native';
import { View, Text, Button, List, ListItem, Icon } from 'native-base';
import { styles } from '../styles/CarbScreen';
import { FoodItem } from '../typings/FoodItem';
import Modal from 'react-native-modal';
import { DAFNESuggestion } from './DAFNESuggestion';
import { suggestInsulinDose } from '../utils/CarbCounting';
import { SECONDARY, TERTIARY, PRIMARY } from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    quantity: Number(this.props.item.serving_qty),
  };

  //When component is first mounted, it remains mounted even after closed to allow for slideOut animation
  handleClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  addLog = () => {
    // Navigate to Log Act Screen with props (Food Item)
    const { item } = this.props;
    const itemToLog = item;
    itemToLog.cho = String(Math.round(Number(item.cho) * this.state.quantity));
    itemToLog.serving_qty = String(Number(item.serving_qty) * this.state.quantity);
    itemToLog.servingWeight = String(Math.round(Number(item.servingWeight) * this.state.quantity));

    this.props.navigation.navigate('LogAct', { item: itemToLog });
    // Unfortunately, this does not unmount previously mounted components so some memory leak here
    // TODO: Should be handling navigation using redux ( instead of passing callback down through props )
    // TODO: Should be subscribing to navigation events and unmounting appropriately
    this.handleClose();
  };

  increaseQuantity = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  decreaseQuantity = () => {
    // cant decrease to 0
    if (this.state.quantity < 2) {
      return;
    }
    this.setState({ quantity: this.state.quantity - 1 });
  };

  render() {
    const { quantity } = this.state;
    const { item } = this.props;
    const cho = Math.round(Number(item.cho) * quantity);
    const weight = Math.round(Number(item.servingWeight) * quantity);

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
                  {suggestInsulinDose(Number(cho), this.props.choRatio)}
                </DAFNESuggestion>
              )}
            </View>
          </View>

          {/* Nutrtional info */}
          <List style={{ marginBottom: 20 }}>
            <ListItem />
            <ListItem>
              <Text style={{}}>Carbohydrate: </Text>
              <Text style={{ color: SECONDARY, fontWeight: 'bold', marginLeft: 'auto' }}>
                {cho}g
              </Text>
            </ListItem>
            <ListItem>
              <Text>Serving Unit: </Text>
              <Text style={{ marginLeft: 'auto' }}>
                {quantity} {this.props.item.servingUnit}
              </Text>
            </ListItem>
            <ListItem>
              <Text>Serving Weight: </Text>
              <Text style={{ marginLeft: 'auto' }}>{weight}g</Text>
            </ListItem>
            <ListItem>
              <Text>Serving Quantity: </Text>
              <TouchableOpacity onPress={this.increaseQuantity}>
                <Icon
                  style={{ marginLeft: 'auto', marginRight: 5, color: 'green' }}
                  name="circle-with-plus"
                  type="Entypo"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.decreaseQuantity}>
                <Icon
                  style={{ marginLeft: 'auto', color: 'red' }}
                  name="circle-with-minus"
                  type="Entypo"
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 'auto' }}>{quantity}</Text>
            </ListItem>
          </List>

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
