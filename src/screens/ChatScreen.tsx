import * as React from 'react';
import { View, Text } from 'native-base';
import { connect } from 'react-redux';
import PromptChannelKey from '../components/PromptChannelKey';
import { addChannelKey } from '../actions/actions';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  getMessages,
  sendMessage,
  groupChatsRef,
  getChannelRef,
  unsubscribe,
  subscribe,
} from '../utils/FirebaseDB/FirestoreUtils';
import { getCurrentUser } from '../utils/FirebaseAuth/AuthUtils';
import { getUserFromAuth } from '../utils/ChatUtils';

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

  // If no ChannelKey prompt user and callback to this fn with new key
  handleNewKey = (key: string) => {
    this.props.addChannelKey(key);
  };

  onSend = (messages: any) => {
    const message = messages[0];
    const channelKey = 'DAFNE123'; // Hard-coding, get from redux-state in future

    sendMessage(channelKey, message);
  };

  componentDidMount() {
    const channelKey = 'DAFNE123'; // Hard-coding, get from redux-state in future
    subscribe(channelKey); // Subsribe to new messages

    // Get the previous messages
    getMessages(channelKey).then(messages => this.setState({ messages: messages }));
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
    const channelKey = 'DAFNE123'; //hard-coding

    unsubscribe(channelKey);
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
