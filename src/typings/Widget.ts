export interface Widget {
  widgetId: string;
  widgetName: string;
  enabled: boolean;

  // Adding for Home Screen func
  navKey?: string;
  iconName?: string;
}

export const chatWidget: Widget = {
  widgetId: 'recentLogs',
  widgetName: 'Recent Logs',
  enabled: false,
  navKey: 'Chat',
  iconName: 'chat',
};

export const trainWidget: Widget = {
  widgetId: 'recentLogs',
  widgetName: 'Recent Logs',
  enabled: false,
  navKey: 'Train',
  iconName: 'train',
};

export const recentLogsWidget: Widget = {
  widgetId: 'recentLogs',
  widgetName: 'Recent Logs',
  enabled: true,
};

export const tempWidget: Widget = {
  widgetId: 'tempWidget',
  widgetName: 'Temp Widget',
  enabled: true,
};
