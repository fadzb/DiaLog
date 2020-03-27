import * as React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  View,
  List,
  ListItem,
  Left,
  Thumbnail,
  Text,
  Body,
  Right,
  Button,
} from 'native-base';
import { styles } from '../styles/TrainScreen';
import { ModuleHeader } from '../components/ModuleHeader';
import { TrainModule } from '../typings/TrainModule';
import { WebView } from 'react-native-webview';

interface ModuleScreenProps {
  navigation: any;
}

export class ModuleScreen extends React.Component<ModuleScreenProps> {
  constructor(props: any) {
    super(props);
  }

  // get module list from navigation prop state
  state = {
    moduleList: this.props.navigation.getParam('moduleList'),
    moduleGroup: this.props.navigation.getParam('moduleGroup'),
  };

  handlePress = (module: TrainModule) => {
    this.props.navigation.navigate('Web', { module: module });
  };

  render() {
    const { moduleList, moduleGroup } = this.state;

    return (
      <View>
        <List>
          <ListItem itemHeader>
            <Text>{moduleGroup}</Text>
          </ListItem>
          {moduleList.map((module: TrainModule, index: any) => {
            return (
              <ListItem key={`list-item-${module}`} thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: module.thumbnail }} />
                </Left>
                <Body>
                  <Text>{module.moduleName}</Text>
                  <Text note numberOfLines={1}>
                    {module.desc}
                  </Text>
                </Body>
                <Right>
                  <Button onPress={() => this.handlePress(module)}>
                    <Text>View</Text>
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </View>
    );
  }
}
