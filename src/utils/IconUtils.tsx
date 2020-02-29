import { Icon } from 'native-base';
import React from 'react';

interface icon {
  name: string;
  type: any;
}

const Icons: any = {
  camera: { name: 'camera', type: 'Entypo' },
  flashlight: { name: 'flashlight', type: 'Entypo' },
  home: { name: 'home', type: 'AntDesign' },
  food: { name: 'food', type: 'MaterialCommunityIcons' },
  addLog: { name: 'add-to-list', type: 'Entypo' },
  activity: { name: 'activity', type: 'Feather' },
  profile: { name: 'person-outline', type: 'MaterialIcons' },
  train: { name: 'open-book', type: 'Entypo' },
  chat: { name: 'wechat', type: 'AntDesign' },
  search: { name: 'search', type: 'FontAwesome' },
  close: { name: 'close', type: 'EvilIcons' },
};

const getIconJSX = (icon: icon) => {
  return <Icon name={icon.name} type={icon.type} />;
};

export const getIcon = (key: string) => {
  const icon_object: icon = Icons[key];
  const icon_jsx: any = getIconJSX(icon_object);

  return icon_jsx;
};
