import rootReducer from './reducers/reducer';
import { createStore } from 'redux';
import { recentLogsWidget, tempWidget } from './typings/Widget';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';

const initialState: any = {
  name: '',
  logs: [],
  widgets: [recentLogsWidget, tempWidget],
};

// export default createStore(rootReducer, initialState);

//TODO: Persisted Store

// Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create reducer, store and persistor
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, initialState);
const persistor = persistStore(store);

// Functions to retreive persistor, store and state
const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
  return store.getState();
};

// Exporting store as an object: usage: store.getStore() or store.getState() or store.getPersistor()
export default { getStore, getState, getPersistor };
