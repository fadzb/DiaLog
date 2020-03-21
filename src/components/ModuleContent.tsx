import * as React from 'react';
import { View, Text } from 'native-base';
import { TrainModule } from '../typings/TrainModule';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-navigation';

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
      <SafeAreaView style={{ borderWidth: 1 }}>
        {/* <Text>{module.moduleContent}</Text> */}

        <WebView
          useWebKit={false}
          style={{ marginTop: 20 }}
          source={{ html: '<p>HIIIIIIIIIIIIIIIIIIII</p>' }}
        />
      </SafeAreaView>
    );
  }
}
