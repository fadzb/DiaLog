import { User } from '../typings/User';

// Uses email if no display name set
export const getUserFromAuth = (userAuth: any) => {
  const user: User = {
    _id: userAuth.uid,
    name: userAuth.displayName || userAuth.email,
  };

  return user;
};
