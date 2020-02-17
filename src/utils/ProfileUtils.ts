export const DEFAULT_PIC = require('../assets/images/defualt.png');

// TODO: Move this func to Auth Utils and handle with Firebase Auth idiomatically
export const createGuestUser = () => {
  const user = {
    email: 'Guest Account',
    displayName: 'Guest',
  };

  return user;
};
