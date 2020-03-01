import { Widget } from '../typings/Widget';
import store from '../store';
import { updateWidget } from '../actions/actions';

// Return ids of each disabled widget
export const getDisabledWidgetIds = (widgets: Widget[]) => {
  const disabledWidgetsIds: string[] = [];

  console.log('getting...');

  widgets.forEach(widget => {
    if (!widget.enabled) disabledWidgetsIds.push(widget.widgetId);
  });

  console.log(disabledWidgetsIds);

  return disabledWidgetsIds;
};

// Dispatch redux action to update properties of widget (i.e. enabled/disabled)
export const dispatchUpdateWidget = (widget: Widget) => {
  store.getStore().dispatch(updateWidget(widget));
};

export const getWidgetById = (widgetId: string, widgets: Widget[]) => {
  const widget = widgets.find((widget: Widget) => widget.widgetId == widgetId);

  return widget;
};

export const shouldRenderWidget = (widget: Widget) => {
  const shouldRender = widget && widget.enabled;

  return shouldRender;
};
