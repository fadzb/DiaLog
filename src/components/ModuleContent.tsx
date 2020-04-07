import * as React from 'react';
import { View, Text } from 'native-base';
import { TrainModule } from '../typings/TrainModule';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-navigation';
import { Dimensions } from 'react-native';

const horizontalPadding = 5;
const SCREEN_WIDTH = Dimensions.get('window').width - horizontalPadding;

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* <Text>{module.moduleContent}</Text> */}

        {/* this is bullshit try https://www.npmjs.com/package/react-native-autoheight-webview */}
        <WebView
          style={{ marginTop: 20, maxHeight: 500, width: 400, flex: 1 }}
          source={{ html: module.moduleContent }}
          scalesPageToFit={true}
        />
      </View>
    );
  }
}
