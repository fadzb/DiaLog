import * as React from 'react';
import { View, Switch, Text } from 'native-base';
import { Widget } from '../typings/Widget';
import { styles } from '../styles/HomeScreen';
import { TouchableOpacity } from 'react-native';
import { getIcon } from '../utils/IconUtils';

interface WidgetButtonProps {
  key: any;
  widget: Widget;
  navigation: any;
}

export class WidgetButton extends React.Component<WidgetButtonProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  handleWidgetNav = () => {
    this.props.navigation.navigate(this.props.widget.navKey, {});
  };

  render() {
    const { widget } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.handleWidgetNav} style={styles.item}>
          {Boolean(widget.iconName) && getIcon(widget.iconName)}
          <Text style={styles.itemText}>{widget.widgetName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
