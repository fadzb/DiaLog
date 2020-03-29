import * as React from 'react';
import { View, Text, Card, CardItem, Body } from 'native-base';
import { Log } from '../typings/Log';
import { getType } from '../utils/ActivityLogUtils';
import { getIcon } from '../utils/IconUtils';
import { TouchableOpacity } from 'react-native';
import { DateUtils } from '../utils/DateUtils';

interface LogDetailsProps {
  log: Log;
  closeDetails: () => void;
}

export class LogDetails extends React.Component<LogDetailsProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { log } = this.props;
    console.log(log.time);

    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Log Details</Text>
            <TouchableOpacity
              onPress={this.props.closeDetails}
              style={{ position: 'absolute', right: 10 }}
            >
              {getIcon('close')}
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Activity Type: {getType(log)}</Text>
              <Text>Time: {DateUtils.parseDateTimeIntoDateLabel(new Date(log.time))}</Text>
              {Boolean(log.cho) && <Text>Carbohydrate: {log.cho} g</Text>}
              {Boolean(log.insulin) && <Text>Insulin: {log.insulin} Units</Text>}
              {Boolean(log.glucose) && <Text>Glucose: {log.glucose} mmo/l</Text>}
              <Text>Notes: </Text>
              {Boolean(log.notes) && <Text> {log.notes}</Text>}
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}
