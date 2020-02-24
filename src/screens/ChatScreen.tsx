import * as React from 'react';
import { View } from 'native-base';
import { connect } from 'react-redux';
import PromptChannelKey from '../components/PromptChannelKey';
import { addChannelKey } from '../actions/actions';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  getMessages,
  sendMessage,
  unsubscribe,
  subscribe,
} from '../utils/FirebaseDB/FirestoreUtils';
import { getCurrentUser } from '../utils/FirebaseAuth/AuthUtils';
import { getUserFromAuth } from '../utils/ChatUtils';
import { Message } from '../typings/Message';
import { Platform, KeyboardAvoidingView } from 'react-native';

interface ChatScreenProps {
  navigation: any;

  // Redux
  channelKey: string;
  addChannelKey: (key: string) => void;
}

class ChatScreen extends React.Component<ChatScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    messages: [],
    user: {},
  };

  setMessages = (messages: Message[]) => {
    this.setState({ messages: messages });
  };

  // If no ChannelKey prompt user and callback to this fn with new key
  handleNewKey = (key: string) => {
    this.props.addChannelKey(key);

    subscribe(key, this.handleNewMessages);
  };

  onSend = (messages: Message[]) => {
    const message = messages[0];

    sendMessage(this.props.channelKey, message);
  };

  handleNewMessages = (messages: Message[]) => {
    this.setMessages(messages);
  };

  componentDidMount() {
    if (this.props.channelKey) {
      subscribe(this.props.channelKey, this.handleNewMessages);
    }

    // Get the previous messages
    getMessages(this.props.channelKey).then(messages => this.setMessages(messages));
  }

  // Get User object for GiftedChat
  getUser = () => {
    // Get the current user auth
    const userAuth = getCurrentUser();

    // Create a user object from it
    const user = getUserFromAuth(userAuth);

    return user;
  };

  // Unsubscribe to messages (save bandwidth)
  componentWillUnmount = () => {
    unsubscribe(this.props.channelKey);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.props.channelKey && (
          <PromptChannelKey handleValidKey={this.handleNewKey} navigation={this.props.navigation} />
        )}
        {this.props.channelKey && (
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={this.getUser()}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    widgets: state.widgets,
    logs: state.logs,
    channelKey: state.channelKey,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addChannelKey: (key: string) => {
      dispatch(addChannelKey(key));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
