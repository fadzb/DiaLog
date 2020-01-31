import * as React from 'react';
import { View, Button, Text } from 'native-base';
import { TrainModule } from '../typings/TrainModule';
import { test } from '../utils/FirebaseDB/FirestoreUtils';

interface ModuleGroupHeaderProps {
  navigation: any;
  moduleGroup: any;
}

export class ModuleGroupHeader extends React.Component<ModuleGroupHeaderProps> {
  constructor(props: any) {
    super(props);
  }

  getModules = () => {
    test();
  };

  // Navigate to ModuleScreen and carry module in navigation prop state
  openModule = () => {
    this.getModules();
    // this.props.navigation.navigate('Mod', { module: this.getModule() });
  };

  render() {
    return (
      <View style={{ margin: 5 }}>
        <Button onPress={this.openModule}>
          <Text>{this.props.moduleGroup}</Text>
        </Button>
      </View>
    );
  }
}
