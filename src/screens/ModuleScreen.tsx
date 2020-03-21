import * as React from 'react';
import { Container, Header, Title, Content } from 'native-base';
import { styles } from '../styles/TrainScreen';
import { ModuleHeader } from '../components/ModuleHeader';
import { TrainModule } from '../typings/TrainModule';
import { WebView } from 'react-native-webview';

interface ModuleScreenProps {
  navigation: any;
}

export class ModuleScreen extends React.Component<ModuleScreenProps> {
  constructor(props: any) {
    super(props);
  }

  // get module list from navigation prop state
  state = {
    moduleList: this.props.navigation.getParam('moduleList'),
    moduleGroup: this.props.navigation.getParam('moduleGroup'),
  };

  render() {
    const { moduleList, moduleGroup } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Title>{moduleGroup}</Title>
        </Header>
        <Content style={styles.contentContainer}>
          {moduleList.map((module: TrainModule, index: any) => {
            return <ModuleHeader module={module} key={index} />;
          })}
        </Content>
      </Container>
    );
  }
}
