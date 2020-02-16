import reducer from './reducers/reducer';
import { createStore } from 'redux';
import { Widget } from './typings/Widget';

const recentLogsWidget: Widget = {
  widgetId: 'recentLogs',
  widgetName: 'Recent Logs',
  enabled: true,
};

const tempWidget: Widget = {
  widgetId: 'tempWidget',
  widgetName: 'Temp Widget',
  enabled: true,
};

const initialState: any = {
  name: '',
  logs: [],
  widgets: [recentLogsWidget, tempWidget],
};

//TODO: Tidy this up
export default createStore(reducer, initialState);
