import * as React from 'react';
import { Container, Header, Title, Content } from 'native-base';
import { styles } from '../styles/TrainScreen';
import { ModuleGroupHeader } from '../components/ModuleGroupHeader';
import { getModules } from '../utils/TrainModuleUtils';
import { TrainModule } from '../typings/TrainModule';

interface TrainScreenProps {
  navigation: any;
}

export class TrainScreen extends React.Component<TrainScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    modules: [],
  };

  // Get all training modules
  setModules = () => {
    const modules: TrainModule[] = getModules();

    this.setState({ modules });
  };

  componentDidMount = () => {
    this.setModules();
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>Training Modules</Title>
        </Header>
        <Content style={styles.contentContainer}>
          {this.state.modules.map((module: TrainModule, index: any) => {
            return (
              <ModuleGroupHeader navigation={this.props.navigation} module={module} key={index} />
            );
          })}
        </Content>
      </Container>
    );
  }
}
