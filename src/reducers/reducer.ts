import { ADD_NAME } from '../actions/types';

const initialState = {
  name: '',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state };
      break;

    case 'LOG_OUT':
      return { ...state };

    default:
      return state;
      break;
  }
};

export default reducer;
