import * as React from 'react';
import { Container, Header, Content, Title, Button, Text } from 'native-base';
import { styles } from '../styles/ViewActScreen';
import { ActivityChart } from '../components/ActivityChart';

interface ViewActScreenProps {
  navigation: any;
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
