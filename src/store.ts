import reducer from './reducers/reducer';
import { createStore } from 'redux';
import { recentLogsWidget, tempWidget } from './typings/Widget';

const initialState: any = {
  name: '',
  logs: [],
  widgets: [recentLogsWidget, tempWidget],
};

//TODO: Tidy this up
export default createStore(reducer, initialState);
