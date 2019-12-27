import * as React from 'react';
import { Container, Header, Content, Title, Button, Text } from 'native-base';
import { styles } from '../styles/LogActScreen';

interface ViewActScreenProps {}

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
          <Button onPress={this.handleGoBack}>
            <Text>Go back</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
