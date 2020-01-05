import * as React from 'react';
import { View } from 'native-base';

interface ScreenProps {
  navigation: any;
}

export class Screen extends React.Component<ScreenProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <View></View>;
  }
}
