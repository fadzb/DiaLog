import * as React from 'react';
import { View } from 'native-base';
import { connect } from 'react-redux';
import PromptChannelKey from '../components/PromptChannelKey';

interface ChatScreenProps {
  navigation: any;

  channelKey: string;
}

class ChatScreen extends React.Component<ChatScreenProps> {
  constructor(props: any) {
    super(props);
  }

  //If no ChannelKey prompt user

  render() {
    return (
      <View>
        {!this.props.channelKey && (
          <PromptChannelKey handleModalClose={() => {}} navigation={this.props.navigation} />
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
