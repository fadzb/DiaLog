import * as React from 'react';
import { View, Text, Button, Icon, Card, CardItem } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { getIcon } from '../utils/IconUtils';

interface MLKitLabelsProps {
  labels: string[];
  onPress: (label: string) => void;
  closeLabels: () => void;
}

export class MLKitLabels extends React.Component<MLKitLabelsProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { labels } = this.props;

    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Image Recognition Detected Foods:</Text>
            <TouchableOpacity
              onPress={this.props.closeLabels}
              style={{ position: 'absolute', right: 10 }}
            >
              {getIcon('close')}
            </TouchableOpacity>
          </CardItem>
          {labels.map((label: string, index: any) => {
            return (
              <Button iconRight light key={index} onPressOut={() => this.props.onPress(label)}>
                <Text>{label}</Text>
                <Icon name="arrow-forward" />
              </Button>
            );
          })}
        </Card>
      </View>
    );
  }
}
