import firestore from '@react-native-firebase/firestore';

// ref to modules collection
const ref = firestore().collection('modules');

export function test() {
  console.log(ref);
}
