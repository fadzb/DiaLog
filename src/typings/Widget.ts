export interface Widget {
  widgetId: string;
  widgetName: string;
  enabled: boolean;

  // Adding for Home Screen func
  navKey?: string;
  iconName?: string;
  onTabBar?: boolean;
}

export const chatWidget: Widget = {
  widgetId: 'Chat',
  widgetName: 'Chat',
  enabled: true,
  navKey: 'Chat',
  iconName: 'chat',
  onTabBar: false,
};

export const trainWidget: Widget = {
  widgetId: 'Train',
  widgetName: 'Training Modules',
  enabled: true,
  navKey: 'Train',
  iconName: 'train',
  onTabBar: false,
};

export const recentLogsWidget: Widget = {
  widgetId: 'recentLogs',
  widgetName: 'Recent Logs',
  enabled: true,
  onTabBar: true,
};

export const testWidget: Widget = {
  widgetId: 'ApiTest',
  widgetName: 'Test APIs',
  enabled: true,
  navKey: 'ApiTest',
  onTabBar: false,
};

export const tempWidget: Widget = {
  widgetId: 'tempWidget',
  widgetName: 'Temp Widget',
  enabled: true,
};

// Widgets for initial state
export const WIDGETS: Widget[] = [chatWidget, trainWidget, recentLogsWidget, testWidget];
