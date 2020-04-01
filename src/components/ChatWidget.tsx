import * as React from 'react';
import {
  View,
  Text,
  Card,
  CardItem,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Thumbnail,
  Body,
  Button,
} from 'native-base';
import { Log } from '../typings/Log';
import { sortByDateDescending, getLogHeader } from '../utils/ActivityLogUtils';
import { styles } from '../styles/HomeScreen';
import { GLOBAL } from '../styles/global';
import { getModuleGroups } from '../utils/TrainModuleUtils';
import { getModules } from '../utils/FirebaseDB/FirestoreUtils';
const DAFNE_IMAGE = require('../assets/images/dafne.png');

interface ChatWidgetProps {
  navigation: any;
  channelKey: string;
}

export class ChatWidget extends React.Component<ChatWidgetProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    newMessages: 1,
  };

  componentDidMount = () => {};

  handlePress = () => {
    this.props.navigation.navigate('Chat');
  };

  render() {
    const { channelKey } = this.props;

    return (
      <View style={GLOBAL.shadowBox}>
        <Card style={styles.card}>
          <CardItem header>
            <Text style={styles.header}>Chat</Text>
          </CardItem>
          {channelKey ? (
            <ListItem thumbnail>
              <Left>
                <Thumbnail source={DAFNE_IMAGE} />
              </Left>
              <Body>
                <Text>{channelKey}</Text>
                <Text note numberOfLines={1}>
                  {this.state.newMessages} New Messages . . .
                </Text>
              </Body>
              <Right>
                <Button onPress={this.handlePress} transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          ) : (
            <ListItem itemDivider>
              <Left>
                <Text>Received a DAFNE Channel Key? </Text>
              </Left>
              <Right>
                <Button transparent onPress={this.handlePress}>
                  <Text>Enter</Text>
                </Button>
              </Right>
            </ListItem>
          )}
        </Card>
      </View>
    );
  }
}
