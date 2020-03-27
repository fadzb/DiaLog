import * as React from 'react';
import { View, Text, Card, CardItem, List, ListItem, Left, Right, Icon } from 'native-base';
import { Log } from '../typings/Log';
import { sortByDateDescending, getLogHeader } from '../utils/ActivityLogUtils';
import { styles } from '../styles/HomeScreen';
import { GLOBAL } from '../styles/global';
import { getModuleGroups } from '../utils/TrainModuleUtils';
import { getModules } from '../utils/FirebaseDB/FirestoreUtils';

interface TrainWidgetProps {
  navigation: any;
}

export class TrainWidget extends React.Component<TrainWidgetProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    moduleGroups: [],
  };

  // Get the groups
  setModuleGroups = () => {
    const moduleGroups: any[] = getModuleGroups();

    this.setState({ moduleGroups });
  };

  componentDidMount = () => {
    this.setModuleGroups();
  };

  handlePress = (moduleGroup: any) => {
    this.openModule(moduleGroup);
  };

  // Navigate to ModuleScreen and carry module in navigation prop state
  openModule = (moduleGroup: any) => {
    // Calls aysnc func to get modules and navigates to ModuleScreen upon resolution with moduleList as a param
    getModules(moduleGroup).then(moduleList => {
      this.props.navigation.navigate('Mod', {
        moduleList: moduleList,
        moduleGroup: moduleGroup,
      });
    });
  };

  render() {
    return (
      <View style={GLOBAL.shadowBox}>
        <Card style={styles.card}>
          <CardItem header>
            <Text>Training Modules</Text>
          </CardItem>
          <List>
            {this.state.moduleGroups.map((moduleGroup: any, index: any) => {
              return (
                <ListItem
                  key={`list-item-${moduleGroup}`}
                  onPress={() => this.handlePress(moduleGroup)}
                >
                  <Left>
                    <Text>{moduleGroup}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </View>
    );
  }
}
