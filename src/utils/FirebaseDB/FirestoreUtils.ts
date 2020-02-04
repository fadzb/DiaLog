import firestore from '@react-native-firebase/firestore';

const ref = firestore().collection('modules');

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
