import * as React from 'react';
import { View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

interface GradientContainerProps {}

export class GradientContainer extends React.Component<GradientContainerProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <LinearGradient style={{ flex: 1, minHeight: '100%' }} colors={['#e66465', '#9198e5']}>
        {this.props.children}
      </LinearGradient>
    );
  }
}
