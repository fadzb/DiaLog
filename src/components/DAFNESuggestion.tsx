import * as React from 'react';
import { View } from 'react-native';
import { Badge, Text } from 'native-base';

interface DAFNESuggestionProps {}

export class DAFNESuggestion extends React.Component<DAFNESuggestionProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  render() {
    return (
      <View>
        <Text style={{ alignSelf: 'flex-start' }}>DAFNE</Text>
        <Badge style={{ alignSelf: 'flex-end' }} info>
          <Text>{this.props.children} Units</Text>
        </Badge>
      </View>
    );
  }
}
