export interface Widget {
  widgetId: string;
  widgetName: string;
  enabled: boolean;
}

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
