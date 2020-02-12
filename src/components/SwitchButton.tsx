import * as React from 'react';
import { View, Switch, Text } from 'native-base';
import { Widget } from '../typings/Widget';

interface SwitchButtonProps {
  widget: Widget;

  // Redux
  updateWidget: (widget: Widget, value: boolean) => void;
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

    // dispatch action: Update widget with new value (i.e. enabled/disabled)
    this.props.updateWidget(this.props.widget, newValue);
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
