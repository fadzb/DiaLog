const initialState = {
  name: '',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state };

    case 'LOG_OUT':
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
