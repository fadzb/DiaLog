import * as React from 'react';
import { Image } from 'react-native';
import { View, Text, Button, Item, Input, Label, Toast, Right, Thumbnail } from 'native-base';
import { styles } from '../styles/CarbScreen';
import { FoodItem } from '../typings/FoodItem';
import Modal from 'react-native-modal';
import { DAFNESuggestion } from './DAFNESuggestion';
import { suggestInsulinDose } from '../utils/CarbCounting';
import { firebase } from '@react-native-firebase/auth';
import { DEFAULT_PIC, createGuestUser } from '../utils/ProfileUtils';
const profilePic = DEFAULT_PIC;

interface ProfileModalProps {
  navigation: any;
  handleModalClose: () => void;
  user: any;
  channelKey: string;
}

export class ProfileModal extends React.Component<ProfileModalProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    modalVisible: true,
    displayName: this.props.user.displayName,
  };

  //When component is first mounted, it remains mounted even after closed to allow for slideOut animation
  handleClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleDisplayName = (displayName: string) => {
    this.setState({ displayName });
  };

  handleUpdate = async () => {
    // wait for firebase to updated
    firebase.auth().currentUser &&
      (await firebase.auth().currentUser.updateProfile({
        displayName: this.state.displayName,
      }));

    // close modal
    this.setState({ modalVisible: false });

    // fire toast
    Toast.show({
      text: `Display Name Updated. Hello ${this.state.displayName}`,
    });

    this.props.handleModalClose();
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
        <View style={{}}>
          {/* Row with Image and Item name */}
          <View style={styles.row}>
            <Thumbnail source={profilePic} />
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <Text style={{ fontSize: 18 }}>{this.props.user.email}</Text>
              <Text note style={{ fontSize: 18 }}>
                {this.props.channelKey || 'No Channel Key Entered'}
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 40 }}>
            <Item fixedLabel>
              <Label>Display Name</Label>
              <Right>
                <Input
                  disabled={!firebase.auth().currentUser}
                  value={this.state.displayName}
                  onChangeText={this.handleDisplayName}
                />
              </Right>
            </Item>
          </View>

          {/* Action buttons */}
          <View style={styles.rowSpaced}>
            <Button onPress={this.handleUpdate}>
              <Text style={{ fontWeight: 'bold' }}>Update</Text>
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
