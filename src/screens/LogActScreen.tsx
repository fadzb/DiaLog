import * as React from 'react';
import { Container, Header, Content, Title } from 'native-base';
import { styles } from '../styles/LogActScreen';
import { ActivityForm } from '../components/ActivityForm';

interface LogActScreenProps {
  navigation: any;
}

export class LogActScreen extends React.Component<LogActScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

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
          <ActivityForm handleSubmit={this.handleFormSubmit} />
        </Content>
      </Container>
    );
  }
}
