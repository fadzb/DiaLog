import { AsyncStorage } from 'react-native';
import { Log } from '../typings/Log';

const ACTIVITY_LOG_KEY = 'activityLogs';

// TESTING Store Activity logs
export function storeActivity(item: Log) {
  const key = ACTIVITY_LOG_KEY;
  aysncStoreItem(key, item);
}

// TESTING Retrieve all Activity logs
export function getActivity() {
  const key = ACTIVITY_LOG_KEY;
  asyncRetrieveItem(key).then(response => console.log(response));
}

// TESTING Retrieve all keys
export function getAllKeys() {
  asyncGetAllKeys().then(response => {
    console.log('keys: ' + response);
  });
}

// TESTING Clear all keys
export function clearAllKeys() {
  // Get all keys
  asyncGetAllKeys().then(allKeys => {
    asyncMultiRemove(allKeys).then(() => console.log('all keys removed'));
  });
}

// API calls
async function aysncStoreItem(key: string, item: any) {
  console.log('storing...');
  await AsyncStorage.setItem(key, JSON.stringify(item))
    .then(() => console.log('Item Stored Succesfully...'))
    .catch(error => console.log('Error Storing Item...' + error));
}

async function asyncRetrieveItem(key: string) {
  console.log('retrieving...');
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem + '');
    console.log('amount: ' + item.length);
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
}

async function asyncGetAllKeys() {
  console.log('getting all keys...');
  const keys: string[] | void = await AsyncStorage.getAllKeys()
    .then(keys => {
      console.log('Keys retrieved...');
      return keys;
    })
    .catch(error => {
      console.log(error);
    });

  return keys;
}

async function asyncMultiRemove(keys: any) {
  console.log('performing multi-removal of keys...');
  await AsyncStorage.multiRemove(keys)
    .then(() => console.log('keys removed...'))
    .catch(error => {
      console.log('Error while removing keys...' + error);
    });
}
