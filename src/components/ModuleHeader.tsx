import * as React from 'react';
import { View, Button, Text, Header, Body } from 'native-base';
import { TrainLevel } from '../typings/TrainLevel';
import { Modal, TouchableOpacity } from 'react-native';
import { ModuleContent } from './ModuleContent';
import { Title } from 'react-native-paper';
import { TrainModule } from '../typings/TrainModule';

interface ModuleHeaderProps {
  module: TrainModule;
}

export class ModuleHeader extends React.Component<ModuleHeaderProps> {
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
    const { module } = this.props;

    return (
      <View style={{ margin: 5 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.handleCloseModal}
        >
          <Header>
            <Title>{module.moduleName}</Title>
          </Header>
          <Body style={{}}>
            <ModuleContent module={module} />
            <TouchableOpacity
              style={{ position: 'absolute', bottom: 20, borderWidth: 5 }}
              onPress={this.handleCloseModal}
            >
              <Text>Back to Modules</Text>
            </TouchableOpacity>
          </Body>
        </Modal>
        <Button onPress={this.handleOpenModal}>
          <Text>{module.moduleName}</Text>
        </Button>
      </View>
    );
  }
}
