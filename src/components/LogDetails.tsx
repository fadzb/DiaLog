import * as React from 'react';
import { View, Switch, Text, Card, CardItem, List, ListItem, Body } from 'native-base';
import { Widget } from '../typings/Widget';
import { Log } from '../typings/Log';
import { getType } from '../utils/ActivityLogUtils';

interface LogDetailsProps {
  log: Log;
}

export class LogDetails extends React.Component<LogDetailsProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { log } = this.props;

    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Log Details</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Activity Type: {getType(log)}</Text>
              <Text>Time: {String(log.time)}</Text>
              {Boolean(log.cho) && <Text>Carbohydrate: {log.cho} g</Text>}
              {Boolean(log.insulin) && <Text>Insulin: {log.insulin} Units</Text>}
              {Boolean(log.glucose) && <Text>Glucose: {log.glucose} mmo/l</Text>}
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}
