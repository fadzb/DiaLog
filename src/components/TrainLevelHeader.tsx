import * as React from 'react';
import { View, Title, Button, Text } from 'native-base';
import { TrainLevel } from '../typings/TrainLevel';

interface TrainLevelHeaderProps {
  level: TrainLevel;
}

export class TrainLevelHeader extends React.Component<TrainLevelHeaderProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { level } = this.props;

    return (
      <View style={{ margin: 5 }}>
        <Button onPress={() => console.log('pressed')}>
          <Text>{level.title}</Text>
        </Button>
      </View>
    );
  }
}
