import { ADD_NAME } from '../actions/types';

const initialState = {
  name: '',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_NAME:
      console.log('add name reducer');
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
