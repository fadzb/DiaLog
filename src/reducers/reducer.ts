import { ADD_NAME, ADD_LOG, UPDATE_WIDGET } from '../actions/types';
import { Log } from '../typings/Log';
import { Widget } from '../typings/Widget';

const initialState: any = {
  name: '',
  logs: [],
  widgets: [],
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

    //Default
    default:
      return state;
  }
};

export default rootReducer;
