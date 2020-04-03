import * as React from 'react';
import { View, Text, Card, CardItem, Body } from 'native-base';
import { Log } from '../typings/Log';
import { getType, getTypes } from '../utils/ActivityLogUtils';
import { getIcon } from '../utils/IconUtils';
import { TouchableOpacity } from 'react-native';
import { DateUtils } from '../utils/DateUtils';
import { PRIMARY } from '../styles/global';

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
    // const type = getType(log);
    const types = getTypes(log);

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
              <Text>
                <Text>Time: </Text>
                <Text style={{ fontWeight: '600', color: PRIMARY }}>
                  {DateUtils.parseDateTimeIntoDateLabel(new Date(log.time))}
                </Text>
              </Text>
              <Text>Activity Type: {types}</Text>

              {Boolean(log.cho) && (
                <Text>
                  <Text>Carbohydrate:</Text>
                  <Text style={{ color: 'orange', fontWeight: '600' }}> {log.cho} g</Text>
                </Text>
              )}
              {Boolean(log.insulin) && (
                <Text>
                  <Text>Insulin: </Text>
                  <Text style={{ color: 'blue', fontWeight: '600' }}>{log.insulin} Units</Text>
                </Text>
              )}
              {Boolean(log.glucose) && (
                <Text>
                  <Text>Glucose: </Text>
                  <Text style={{ color: 'green', fontWeight: '600' }}>{log.glucose} mmo/l</Text>
                </Text>
              )}
              <Text>Notes: </Text>
              {Boolean(log.notes) && <Text style={{ color: 'grey' }}> {log.notes}</Text>}
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}
