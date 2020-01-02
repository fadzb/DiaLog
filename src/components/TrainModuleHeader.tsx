import * as React from 'react';
import { View, Title, Button, Text } from 'native-base';
import { TrainModule } from '../typings/TrainModule';

interface TrainModuleProps {
  navigation: any;
  module: TrainModule;
}

export class TrainModuleHeader extends React.Component<TrainModuleProps> {
  constructor(props: any) {
    super(props);
  }

  // Navigate to ModuleScreen and carry module in navigation prop state
  openModule = () => {
    this.props.navigation.navigate('ModuleScreen', { module: this.props.module });
  };

  render() {
    const { module } = this.props;
    return (
      <View style={{ margin: 5 }}>
        <Button onPress={this.openModule}>
          <Text>{module.title}</Text>
        </Button>
      </View>
    );
  }
}
