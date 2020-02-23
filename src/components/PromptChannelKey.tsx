import * as React from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import { View, Text, Button, Form, Item, Label, Input } from 'native-base';
import { styles } from '../styles/ChatScreen';
import Modal from 'react-native-modal';
import { validateKey } from '../utils/FirebaseDB/FirestoreUtils';

interface PromptChannelKeyProps {
  navigation: any;

  handleValidKey: (channelKey: string) => void;
}

export default class PromptChannelKey extends React.Component<PromptChannelKeyProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    modalVisible: true,
    channelKeyInput: '',
  };

  handleChannelKeyChange = (channelKeyInput: string) => {
    this.setState({ channelKeyInput });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => {
    this.closeModal();

    this.props.navigation.goBack();
  };

  handleConfirm = async () => {
    const key = this.state.channelKeyInput;

    // Validate key
    const keyValid = await validateKey(key);

    if (keyValid) {
      Alert.alert('Entering Channel: ' + key);
      this.closeModal();

      // Callback to Chat Screen to confirm key
      this.props.handleValidKey(key);
    } else {
      Alert.alert('Invalid Key');
    }
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
          <View style={{ margin: 10 }}>
            <Form>
              <Item floatingLabel>
                <Label>Enter Channel Key</Label>
                <Input onChangeText={this.handleChannelKeyChange} />
              </Item>
            </Form>
          </View>
          <View style={styles.row}>
            <Button onPress={this.handleConfirm}>
              <Text>Confirm</Text>
            </Button>
            <Button warning onPress={this.handleCancel}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
