import { Widget } from '../typings/Widget';
import store from '../store';
import { updateWidget } from '../actions/actions';

// Dispatch redux action to update properties of widget (i.e. enabled/disabled)
export const dispatchUpdateWidget = (widget: Widget) => {
  store.dispatch(updateWidget(widget));
};
