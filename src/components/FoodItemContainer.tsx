import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { FoodItem } from '../typings/FoodItem';

interface PropTypes {
  item: FoodItem;
  key: string;
}

export class FoodItemContainer extends React.Component<PropTypes> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.item.name}{' '}
          <Image source={{ uri: this.props.item.photo_url }} style={{ width: 20, height: 20 }} />
        </Text>
      </View>
    );
  }
}
