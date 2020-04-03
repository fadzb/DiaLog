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
  Toast,
} from 'native-base';
import { Log } from '../typings/Log';
import { sortByDateDescending, getLogHeader } from '../utils/ActivityLogUtils';
import { styles } from '../styles/HomeScreen';
import { GLOBAL, PRIMARY, SECONDARY } from '../styles/global';
import { getModuleGroups } from '../utils/TrainModuleUtils';
import { getModules } from '../utils/FirebaseDB/FirestoreUtils';
import { firebase } from '@react-native-firebase/auth';
const DAFNE_IMAGE = require('../assets/images/dafne.png');

interface ChatWidgetProps {
  navigation: any;
  channelKey: string;
  messagesInChannel: number;
  updateMessagesSeen: (number: number) => void;
  messagesSeen: number;
}

export class ChatWidget extends React.Component<ChatWidgetProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount = () => {};

  handlePress = (user: any) => {
    // Not logged in
    if (!user) {
      Toast.show({
        text: `Please Login to access this feature!`,
        buttonText: 'Login',
        buttonStyle: { backgroundColor: PRIMARY },
        type: 'warning',
        duration: 5000,
        onClose: (reason: any) => {
          reason == 'user' && this.props.navigation.navigate('Login');
        },
      });

      return;
    }

    // Assume this action leads to user seeing messages
    this.props.updateMessagesSeen(this.props.messagesInChannel);

    this.props.navigation.navigate('Chat');
  };

  render() {
    const { channelKey } = this.props;
    const user = firebase.auth().currentUser;

    const newMessages = this.props.messagesInChannel - this.props.messagesSeen;

    return (
      <View style={GLOBAL.shadowBox}>
        <Card style={styles.card}>
          <CardItem header>
            <Text style={styles.header}>Chat</Text>
          </CardItem>
          {channelKey && user ? (
            <ListItem thumbnail>
              <Left>
                <Thumbnail source={DAFNE_IMAGE} />
              </Left>
              <Body>
                <Text>{channelKey}</Text>
                <Text numberOfLines={1} style={{ fontSize: 14, color: SECONDARY }}>
                  {newMessages} New Messages . . .
                </Text>
              </Body>
              <Right>
                <Button onPress={() => this.handlePress(user)}>
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
                <Button transparent onPress={() => this.handlePress(user)}>
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
