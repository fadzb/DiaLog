import * as React from 'react';
import { View, Card, CardItem, Left, Thumbnail, Text, Body, Switch } from 'native-base';
import { DEFAULT_PIC, createGuestUser } from '../utils/ProfileUtils';
import { Image } from 'react-native';
import { getCurrentUser } from '../utils/FirebaseAuth/AuthUtils';
import { SwitchButton } from '../components/SwitchButton';

interface ProfileScreenProps {
  navigation: any;
}

const profilePic = DEFAULT_PIC;

export class ProfileScreen extends React.Component<ProfileScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    user: getCurrentUser(),
  };

  render() {
    const { user } = this.state;

    return (
      <View>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={profilePic} />
              <Body>
                <Text>{user.displayName || 'No Display Name'}</Text>
                <Text note>{user.email}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>Widgets Enabled</Text>
          </CardItem>
          <CardItem>
            <SwitchButton name={'Recent Logs'} initialValue={true} />
          </CardItem>
        </Card>
      </View>
    );
  }
}
