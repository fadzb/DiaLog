import * as React from 'react';
import { View, Text } from 'native-base';
import { connect } from 'react-redux';
import PromptChannelKey from '../components/PromptChannelKey';
import { addChannelKey } from '../actions/actions';

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

  // If no ChannelKey prompt user and callback to this fn with new key
  handleNewKey = (key: string) => {
    this.props.addChannelKey(key);
  };

  render() {
    return (
      <View>
        {!this.props.channelKey && (
          <PromptChannelKey handleValidKey={this.handleNewKey} navigation={this.props.navigation} />
        )}
        {this.props.channelKey && <Text>{this.props.channelKey}</Text>}
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
