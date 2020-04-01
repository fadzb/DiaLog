import {
  ADD_NAME,
  ADD_LOG,
  UPDATE_WIDGET,
  CLEAR_LOGS,
  ADD_CHANNEL_KEY,
  SET_CHO_RATIO,
  SET_INSULIN_SUGGESTIONS,
  UPDATE_DISPLAY_NAME,
} from '../actions/types';
import { Log } from '../typings/Log';
import { Widget } from '../typings/Widget';
import { getCurrentUser } from '../utils/FirebaseAuth/AuthUtils';
import { firebase } from '@react-native-firebase/auth';

// just acts an interface to state => actual initial state defined in store.ts
const initialState: any = {
  name: '',
  logs: [],
  widgets: [],
  channelKey: '',
  choRatio: 0,
  insulinSuggestions: false,
  displayName: '',
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_WIDGET: {
      // Updated Widget
      const updatedWidget = action.payload;

      // Current state of widgets
      const widgets = state.widgets;

      // Get widget Index
      const widgetIndex = widgets.findIndex(
        (widget: Widget) => widget.widgetId === updatedWidget.widgetId,
      );

      // Get updated list without mutating
      const updatedWidgetList = [
        ...widgets.slice(0, widgetIndex),
        Object.assign({}, updatedWidget),
        ...widgets.slice(widgetIndex + 1),
      ];

      // Return new state
      return { ...state, widgets: updatedWidgetList };
    }

    //Add name
    case ADD_NAME: {
      console.log('add name reducer');
      return { ...state };
    }

    //Add log
    case ADD_LOG: {
      // New Log to add
      const newLog: Log = action.payload;

      // Current state of logs
      const logs = state.logs;

      // Get updated list without mutating
      const updatedLogList: Log[] = logs.concat(newLog);

      // Return new State
      return { ...state, logs: updatedLogList };
    }

    // Clear Logs in memory (persisted logs will remain)
    case CLEAR_LOGS: {
      return { ...state, logs: initialState.logs };
    }

    // Add a new channel key
    case ADD_CHANNEL_KEY: {
      // New key
      const newKey = action.payload;

      return { ...state, channelKey: newKey };
    }

    case SET_CHO_RATIO: {
      // new ratio:
      const newRatio = action.payload;

      return { ...state, choRatio: newRatio };
    }

    case SET_INSULIN_SUGGESTIONS: {
      const newValue = action.payload;

      return { ...state, insulinSuggestions: newValue };
    }

    //Default
    default:
      return state;
  }
};

export default rootReducer;
