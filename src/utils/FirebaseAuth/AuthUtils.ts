import { ErrorCodes } from './ErrorCodes';
import { firebase } from '@react-native-firebase/auth';
import { createGuestUser } from '../ProfileUtils';

export const register = async (email: string, password: any) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log('success.');
    return userCredential;
  } catch (error) {
    if (error.code == ErrorCodes.emailAlreadyInUse) {
      console.log('Email already registered...');
    }
    console.log(error);
  }
};

export const getCurrentUser = () => {
  const user = firebase.auth().currentUser;

  if (!user) {
    return createGuestUser();
  }

  return user;
};

export const login = async (email: string, password: any) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log(userCredential.user.email + ' logged in.');
    return userCredential;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log(error);
  }
};
