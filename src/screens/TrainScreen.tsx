import * as React from 'react';
import { Container, Header, Title, Content } from 'native-base';
import { styles } from '../styles/TrainScreen';
import { ModuleGroupHeader } from '../components/ModuleGroupHeader';
import { getModuleGroups } from '../utils/TrainModuleUtils';
import { TrainModule } from '../typings/TrainModule';

interface TrainScreenProps {
  navigation: any;
}

export class TrainScreen extends React.Component<TrainScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    moduleGroups: [],
  };

  // Get the groups
  setModuleGroups = () => {
    const moduleGroups: any[] = getModuleGroups();

    this.setState({ moduleGroups });
  };

  componentDidMount = () => {
    this.setModuleGroups();
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>Training Modules</Title>
        </Header>
        <Content style={styles.contentContainer}>
          {this.state.moduleGroups.map((moduleGroup: any, index: any) => {
            return (
              <ModuleGroupHeader
                navigation={this.props.navigation}
                moduleGroup={moduleGroup}
                key={index}
              />
            );
          })}
        </Content>
      </Container>
    );
  }
}
