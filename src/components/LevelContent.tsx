import * as React from 'react';
import { View, Title, Content, Text } from 'native-base';
import { TrainLevel } from '../typings/TrainLevel';

interface LevelContentProps {
  level: TrainLevel;
}

export class LevelContent extends React.Component<LevelContentProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { level } = this.props;

    return (
      <View style={{ borderWidth: 1 }}>
        <Title>{level.title}</Title>
        <Text>{level.content + 'dsadsaffadsfds'}</Text>
      </View>
    );
  }
}
