import firestore from '@react-native-firebase/firestore';

const ref = firestore().collection('modules');
const groupChatsSubRef = 'Messages'; // For groupChats collection

// get ref to groupChats collection
export const groupChatsRef = firestore().collection('groupChats');

// get a ref to specific channel
export const getChannelRef = (channelKey: string) => {
  return groupChatsRef.doc(channelKey).collection(groupChatsSubRef);
};

// Attach a listener to db updates (new messages), takes a callback fn
export const subscribe = (channelKey: string, updateMessages: (messages: any) => void) => {
  const channelRef = getChannelRef(channelKey);

  channelRef.onSnapshot(querySnapshot => updateMessages(handleSnapshot(querySnapshot)));
};

// Detach listener
export const unsubscribe = (channelKey: string) => {
  const channelRef = getChannelRef(channelKey);

  channelRef.onSnapshot(() => {});
};

// Sends a message to groupChannel
export const sendMessage = (channelKey: string, message: any) => {
  groupChatsRef
    .doc(channelKey)
    .collection(groupChatsSubRef)
    .add(message)
    .then(docRef => console.log('message sent with id: ' + docRef.id))
    .catch(error => console.log('Error sending message: ', error));
};

// Returns a promise which resolves to list of messages
export const getMessages = (channelKey: string) => {
  return groupChatsRef
    .doc(channelKey)
    .collection(groupChatsSubRef)
    .get()
    .then(querySnapshot => handleSnapshot(querySnapshot))
    .catch(error => console.log('Error getting documents: ', error));
};

// Returns a promise which resolves to a list of JS objects (modules)
export const getModules = (moduleGroup: string) => {
  return ref
    .where('moduleGroup', '==', moduleGroup)
    .get()
    .then(querySnapshot => handleSnapshot(querySnapshot))
    .catch(error => console.log('Error getting documents: ', error));
};

// Returns a module objects as a list
const handleSnapshot = (querySnapshot: any) => {
  const dataList: any = [];
  querySnapshot.forEach((doc: any) => {
    // Uncomment for testing
    // console.log(doc.id, ' => ', doc.data());

    //doc.data() returns 'module' as a JavaScript Object
    const data = doc.data();

    dataList.push(data);
  });

  return dataList;
};

// Just for testing
export async function addTodo() {
  const ref = firestore().collection('todos');
  try {
    await ref.add({
      title: 'todo title',
      complete: false,
    });
  } catch (error) {
    console.log(error);
  }
  console.log('Todo Added');
}
