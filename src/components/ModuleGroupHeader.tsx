import * as React from 'react';
import { View, Button, Text } from 'native-base';
import { getModules } from '../utils/FirebaseDB/FirestoreUtils';

interface ModuleGroupHeaderProps {
  navigation: any;
  moduleGroup: string;
}

export class ModuleGroupHeader extends React.Component<ModuleGroupHeaderProps> {
  constructor(props: any) {
    super(props);
  }

  // Navigate to ModuleScreen and carry module in navigation prop state
  openModule = () => {
    // Calls aysnc func to get modules and navigates to ModuleScreen upon resolution with moduleList as a param
    getModules(this.props.moduleGroup).then(moduleList => {
      this.props.navigation.navigate('Mod', {
        moduleList: moduleList,
        moduleGroup: this.props.moduleGroup,
      });
    });
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
