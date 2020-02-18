import * as React from 'react';
import { Container, Header, Content, Title, Button, Text } from 'native-base';
import { styles } from '../styles/ViewActScreen';
import { ActivityChart } from '../components/ActivityChart';
import { addName } from '../actions/actions';
import { connect } from 'react-redux';
import { Log } from '../typings/Log';

interface ViewActScreenProps {
  navigation: any;

  // Redux
  addName: (name: any) => void;
  logs: Log[];
}

class ViewActScreen extends React.Component<ViewActScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>View Activity</Title>
        </Header>
        <Content style={styles.contentContainer}>
          <ActivityChart preview={false} logs={this.props.logs} />
          <Button onPress={this.handleGoBack}>
            <Text>Go back</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    logs: state.logs,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addName: (name: any) => {
      dispatch(addName(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewActScreen);
