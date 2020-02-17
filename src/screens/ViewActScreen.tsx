import * as React from 'react';
import { Container, Header, Content, Title, Button, Text } from 'native-base';
import { styles } from '../styles/ViewActScreen';
import { ActivityChart } from '../components/ActivityChart';
import { addName } from '../actions/actions';
import HomeScreen from './HomeScreen';
import { connect } from 'react-redux';

interface ViewActScreenProps {
  navigation: any;

  addName: (name: any) => void;
}

export class ViewActScreen extends React.Component<ViewActScreenProps> {
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
          <ActivityChart />
          <Button onPress={this.handleGoBack}>
            <Text>Go back</Text>
          </Button>
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
    addName: (name: any) => {
      dispatch(addName(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
