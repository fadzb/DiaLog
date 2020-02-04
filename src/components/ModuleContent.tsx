import * as React from 'react';
import { View, Text } from 'native-base';
import { TrainModule } from '../typings/TrainModule';

interface ModuleContentProps {
  module: TrainModule;
}

export class ModuleContent extends React.Component<ModuleContentProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { module } = this.props;

    return (
      <View style={{ borderWidth: 1 }}>
        <Text>{module.moduleContent}</Text>
      </View>
    );
  }
}
