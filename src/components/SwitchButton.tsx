import * as React from 'react';
import { View, Switch, Text } from 'native-base';
import { Widget } from '../typings/Widget';

interface SwitchButtonProps {
  widget: Widget;
  handleChange: (newValue: boolean) => void;
}

export class SwitchButton extends React.Component<SwitchButtonProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    value: this.props.widget.enabled,
  };

  handleChange = () => {
    const newValue = !this.state.value;
    this.setState({ value: newValue });

    this.props.handleChange(newValue);
  };

  render() {
    const { widget } = this.props;
    const { value } = this.state;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text>{widget.widgetName}</Text>
        <Switch value={value} onValueChange={this.handleChange}></Switch>
      </View>
    );
  }
}
