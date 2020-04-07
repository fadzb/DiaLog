import * as React from 'react';
import { View, Text, Card, ListItem, Button, Right, Toast } from 'native-base';
import { TrainModule } from '../typings/TrainModule';
import WebView from 'react-native-webview';
import { SafeAreaView, ScrollView } from 'react-navigation';
import { Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { GradientContainer } from '../components/GradientContainer';
import { GLOBAL } from '../styles/global';

const horizontalPadding = 5;
const SCREEN_WIDTH = Dimensions.get('window').width - horizontalPadding;

interface WebViewScreenProps {
  navigation: any;
}

export class WebViewScreen extends React.Component<WebViewScreenProps> {
  constructor(props: any) {
    super(props);
  }

  // get module list from navigation prop state
  state = {
    module: this.props.navigation.getParam('module'),
    showToast: false,
  };

  // Complete module
  handleComplete = () => {
    Toast.show({
      text: `${this.state.module.moduleName} Completed!`,
      buttonText: 'Okay',
    });

    this.props.navigation.navigate('Home');
  };

  render() {
    const { module } = this.state;

    return (
      <GradientContainer>
        <View style={[{ alignItems: 'center' }, GLOBAL.shadowBox]}>
          <Card style={{ height: '90%', width: '95%', borderRadius: 30, padding: 20 }}>
            <ListItem itemHeader first style={{}}>
              <Text style={{ color: 'orange', fontSize: 25 }}>{module.moduleName}</Text>
            </ListItem>
            <ScrollView style={{ flex: 1, paddingTop: 20 }}>
              <HTML
                html={module.moduleContent}
                imagesMaxWidth={Dimensions.get('window').width}
                tagsStyles={{
                  i: {
                    // textAlign: 'center',
                    fontStyle: 'normal',
                    color: 'black',
                    fontSize: 20,
                  },
                  img: {
                    alignSelf: 'center',
                  },
                }}
              />

              <Button
                onPress={this.handleComplete}
                primary
                style={{ margin: 20, marginLeft: 'auto' }}
              >
                <Text>Complete</Text>
              </Button>
            </ScrollView>
          </Card>
        </View>
      </GradientContainer>
    );
  }
}
