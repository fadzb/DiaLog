import * as React from 'react';
import { View, Switch, Text } from 'native-base';

interface SwitchButtonProps {
  name: string;
  initialValue: boolean;
}

export class SwitchButton extends React.Component<SwitchButtonProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    value: this.props.initialValue,
  };

  handleChange = () => {
    this.setState({ value: !this.state.value });
  };

  render() {
    const { name } = this.props;
    const { value } = this.state;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text>{name}</Text>
        <Switch value={value} onValueChange={this.handleChange}></Switch>
      </View>
    );
  }
}
