import * as React from 'react';
import { View, Title, Button, Text } from 'native-base';
import { TrainLevel } from '../typings/TrainLevel';
import { Modal, TouchableOpacity } from 'react-native';
import { LevelContent } from './LevelContent';
import { styles } from '../styles/LoginScreen';

interface TrainLevelHeaderProps {
  level: TrainLevel;
}

export class TrainLevelHeader extends React.Component<TrainLevelHeaderProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    modalVisible: false,
  };

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  handlePress = () => {
    this.openModal();
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { level } = this.props;

    return (
      <View style={{ margin: 5 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.handleModalClose}
        >
          <View style={{ marginTop: 100 }}>
            <LevelContent level={level} />
            <TouchableOpacity
              style={{ marginTop: 500, borderWidth: 5 }}
              onPress={this.handleModalClose}
            >
              <Text>Back to Levels</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Button onPress={this.handlePress}>
          <Text>{level.title}</Text>
        </Button>
      </View>
    );
  }
}
