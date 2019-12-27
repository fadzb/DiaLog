import { AsyncStorage } from 'react-native';
import { Log } from '../typings/Log';

const TEST_KEY = 'TEST KEY';

// TESTING Store Activity logs
export function storeItem(item: Log) {
  const key = TEST_KEY;
  aysncStoreItem(key, item);
}

// TESTING Retrieve all Activity logs
export function getItem() {
  const key = TEST_KEY;
  asyncGetItem(key).then(response => console.log(response));
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

// TESTING Merge new item on top of existing item
export function mergeItems(key: string, newItem: any) {
  asyncMergeItems(key, newItem)
    .then(() => console.log('items merged'))
    // query key to see merged item
    .then(() => asyncGetItem(key))
    .then(items => console.log(items));
}

// TESTING Get multiple items from array of keys (all keys)
export function multiGetItems() {
  asyncGetAllKeys().then(keys => {
    asyncMultiGetItems(keys).then(items => console.log(items));
  });
}

// API calls

export async function aysncStoreItem(key: string, item: any) {
  console.log('storing...');
  await AsyncStorage.setItem(key, JSON.stringify(item))
    .then(() => console.log('Item Stored Succesfully...'))
    .catch(error => console.log('Error Storing Item...' + error));
}

export async function asyncGetItem(key: string) {
  console.log('retrieving...');
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    // const item = JSON.parse(retrievedItem + '');
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
}

export async function asyncGetAllKeys() {
  console.log('getting all keys...');
  const keys: string[] | void = await AsyncStorage.getAllKeys()
    .then(keys => {
      console.log('Keys retrieved.');
      return keys;
    })
    .catch(error => {
      console.log(error);
    });

  return keys;
}

export async function asyncMultiRemove(keys: any) {
  console.log('performing multi-removal of keys...');
  await AsyncStorage.multiRemove(keys)
    .then(() => console.log('keys removed...'))
    .catch(error => {
      console.log('Error while removing keys...' + error);
    });
}

export async function asyncMergeItems(key: string, newItem: any) {
  console.log('merging new item with existing item...');
  await AsyncStorage.mergeItem(key, JSON.stringify(newItem))
    .then(() => console.log('items merged...'))
    .catch(error => {
      console.log('Error while merging items...' + error);
    });
}

export async function asyncMultiGetItems(keys: string[] | void) {
  console.log('retrieving multiple items...');
  try {
    const retrievedItems = await AsyncStorage.multiGet(keys || []);
    const items: Object[] = [];
    for (let i = 0; i < retrievedItems.length; i++) {
      const item = {
        key: retrievedItems[i][0],
        value: JSON.parse(retrievedItems[i][1]),
      };
      items.push(item);
    }
    console.log('Items retrieved.');
    return items;
  } catch (error) {
    console.log(error.message);
  }
}
