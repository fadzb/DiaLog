import * as React from 'react';
import { View, Card, CardItem, Left, Thumbnail, Text, Body } from 'native-base';
import { DEFAULT_PIC } from '../utils/ProfileUtils';
import { Image } from 'react-native';

interface ProfileScreenProps {
  navigation: any;
}

const profilePic = DEFAULT_PIC;

export class ProfileScreen extends React.Component<ProfileScreenProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={profilePic} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}
