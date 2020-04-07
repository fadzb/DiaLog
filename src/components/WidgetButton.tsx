import * as React from 'react';
import { View, Text } from 'native-base';
import { Widget } from '../typings/Widget';
import { styles } from '../styles/HomeScreen';
import { TouchableOpacity } from 'react-native';
import { getIcon } from '../utils/IconUtils';
import { GLOBAL, PRIMARY, SECONDARY, TERTIARY } from '../styles/global';
import LinearGradient from 'react-native-linear-gradient';

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
      <View
        style={{
          marginHorizontal: 5,
          height: 100,
          width: 100,
          overflow: 'hidden',
          alignItems: 'center',
          alignContent: 'center',
          borderRadius: 100,
          borderWidth: 1,
          borderColor: SECONDARY,
        }}
      >
        <LinearGradient style={{ flex: 1 }} colors={['blue', PRIMARY]}>
          <View style={styles.item}>
            <TouchableOpacity onPress={this.handleWidgetNav}>
              {Boolean(widget.iconName) && (
                <View style={{ alignSelf: 'center', right: 3 }}>
                  {getIcon(`${widget.iconName}`, 'white')}
                </View>
              )}
              <Text style={styles.itemText}>{widget.widgetName}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
