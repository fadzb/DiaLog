import * as React from 'react';
import { View, Button, Text } from 'native-base';
import { TrainLevel } from '../typings/TrainLevel';
import { Modal, TouchableOpacity } from 'react-native';
import { LevelContent } from './LevelContent';

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

  handleOpenModal = () => {
    this.setState({ modalVisible: true });
  };

  handleCloseModal = () => {
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
          onRequestClose={this.handleCloseModal}
        >
          <View style={{ marginTop: 100 }}>
            <LevelContent level={level} />
            <TouchableOpacity
              style={{ marginTop: 500, borderWidth: 5 }}
              onPress={this.handleCloseModal}
            >
              <Text>Back to Levels</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Button onPress={this.handleOpenModal}>
          <Text>{level.title}</Text>
        </Button>
      </View>
    );
  }
}
