import * as React from 'react';
import { View, Text } from 'native-base';
import { connect } from 'react-redux';
import PromptChannelKey from '../components/PromptChannelKey';
import { addChannelKey } from '../actions/actions';
import { GiftedChat } from 'react-native-gifted-chat';
import { getMessages } from '../utils/FirebaseDB/FirestoreUtils';

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
  };

  // If no ChannelKey prompt user and callback to this fn with new key
  handleNewKey = (key: string) => {
    this.props.addChannelKey(key);
  };

  onSend = (messages: any) => {
    console.log('Should send message');
  };

  componentDidMount() {
    const channelKey = 'DAFNE123'; // Hard-coding, get from redux-state in future

    // Get the previous messages
    getMessages(channelKey).then(messages => console.log(messages));
  }

  // Upon render, retreive messages from db

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
            user={{
              _id: 1,
            }}
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
