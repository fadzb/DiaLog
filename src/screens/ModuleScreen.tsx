import * as React from 'react';
import { Container, Header, Title, Content } from 'native-base';
import { styles } from '../styles/TrainScreen';
import { TrainLevel } from '../typings/TrainLevel';
import { TrainLevelHeader } from '../components/TrainLevelHeader';

interface ModuleScreenProps {
  navigation: any;
}

export class ModuleScreen extends React.Component<ModuleScreenProps> {
  constructor(props: any) {
    super(props);
  }

  // get module from navigation prop state
  state = {
    module: this.props.navigation.getParam('module'),
  };

  render() {
    const { module } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Title>Module Screen</Title>
        </Header>
        <Title>{module.title}</Title>
        <Content style={styles.contentContainer}>
          {module.levels.map((level: TrainLevel, index: any) => {
            return <TrainLevelHeader level={level} key={index} />;
          })}
        </Content>
      </Container>
    );
  }
}
