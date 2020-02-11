import * as React from 'react';
import { Container, Header, Content, Title } from 'native-base';
import { styles } from '../styles/LogActScreen';
import { ActivityForm } from '../components/ActivityForm';
import { addName, addLog } from '../actions/actions';
import { connect } from 'react-redux';
import { Log } from '../typings/Log';

interface LogActScreenProps {
  navigation: any;

  //Redux dispatch actions
  addLog: (log: Log) => void;
}

class LogActScreen extends React.Component<LogActScreenProps> {
  constructor(props: any) {
    super(props);
  }

  // get food item from navigation prop state
  state = {
    item: this.props.navigation.getParam('item'),
  };

  handleFormSubmit = () => {
    this.props.navigation.navigate('ViewAct');
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>Log Activity</Title>
        </Header>
        <Content style={styles.contentContainer}>
          <ActivityForm
            item={this.state.item}
            handleSubmit={this.handleFormSubmit}
            addLog={this.props.addLog}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => {
  return {
    name: 'state.name for now is faddle',
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addLog: (log: Log) => {
      dispatch(addLog(log));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogActScreen);
