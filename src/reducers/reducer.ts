import { ADD_NAME, ADD_LOG } from '../actions/types';
import { Log } from '../typings/Log';

const initialState: any = {
  name: '',
  logs: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_NAME:
      console.log('add name reducer');
      return { ...state };

    case ADD_LOG:
      console.log('Dispatched action to add: ' + action.payload);

      const newLog: Log = action.payload;

      const newState = state.logs.push(newLog);

      const willBe = { ...state, ...newState };
      console.log(willBe);

      return { ...state, ...newState };

    default:
      return state;
  }
};

export default reducer;
