import * as React from 'react';
import { Badge } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { GLOBAL } from '../styles/global';

interface ActivityAddButtonProps {
  handlePress: () => void;
  success?: boolean;
  info?: boolean;
  warning?: boolean;
  style?: any;
}

export default class ActivityAddButton extends React.Component<ActivityAddButtonProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  render() {
    const { style, success, info, warning } = this.props;

    return (
      <TouchableOpacity style={[{ margin: 10 }, GLOBAL.shadowBox]} onPress={this.props.handlePress}>
        <Badge
          success={success}
          info={info}
          warning={warning}
          style={[{ height: 40, width: 200 }, style]}
        >
          {this.props.children}
        </Badge>
      </TouchableOpacity>
    );
  }
}
