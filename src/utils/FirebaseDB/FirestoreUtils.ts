import firestore from '@react-native-firebase/firestore';
import { Message } from '../../typings/Message';

const ref = firestore().collection('modules');
const groupChatsSubRef = 'Messages'; // For groupChats collection

// get ref to groupChats collection
export const groupChatsRef = firestore().collection('groupChats');

// get a ref to specific channel
export const getChannelRef = (channelKey: string) => {
  return groupChatsRef.doc(channelKey).collection(groupChatsSubRef);
};

// check if channel key is valid
export const validateKey = async (channelKey: string) => {
  const docRef = groupChatsRef.doc(channelKey);

  return docRef
    .get()
    .then(docSnapshot => {
      if (docSnapshot.exists) {
        return true;
      }
      return false;
    })
    .catch(error => console.log(error));
};

// Attach a listener to db updates (new messages), takes a callback fn
export const subscribe = (channelKey: string, updateMessages: (messages: any) => void) => {
  const channelRef = getChannelRef(channelKey);

  channelRef.onSnapshot(querySnapshot =>
    updateMessages(handleMessagesSnapshot(querySnapshot, false)),
  );
};

// Detach listener
export const unsubscribe = (channelKey: string) => {
  const channelRef = getChannelRef(channelKey);

  channelRef.onSnapshot(() => {});
};

// Sends a message to groupChannel
export const sendMessage = (channelKey: string, message: Message) => {
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
    .orderBy('createdAt', 'desc')
    .get()
    .then(querySnapshot => handleMessagesSnapshot(querySnapshot, true))
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

// Handle snapshot and parse to Message object list
const handleMessagesSnapshot = (querySnapshot: any, sorted: boolean) => {
  const messages: Message[] = [];

  querySnapshot.forEach((doc: any) => {
    const message: Message = {
      _id: doc.data()._id,
      text: doc.data().text,
      createdAt: doc.data().createdAt.toDate(),
      user: doc.data().user,
    };

    messages.push(message);
  });

  // Sort
  if (!sorted) {
    messages.sort((message1: any, message2: any) => {
      return message2.createdAt - message1.createdAt;
    });
  }

  return messages;
};

// Returns objects generically as a list
const handleSnapshot = (querySnapshot: any) => {
  const dataList: any = [];
  querySnapshot.forEach((doc: any) => {
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
