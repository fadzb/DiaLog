export const test = () => {
  const ref = firebase.firestore().collection('modules');

  ref
    .where('moduleGroup', '==', 'Diabetes Basics')
    .get()
    .then(querySnapshot => handleSnapshot(querySnapshot))
    .catch(error => console.log('Error getting documents: ', error));
};

const handleSnapshot = (querySnapshot: any) => {
  querySnapshot.forEach((doc: any) => {
    console.log(doc.id, ' => ', doc.data());

    //get data from doc
    const data = doc.data();
  });
};

// function getModules(moduleGroup) {
//     // ref to the table
//     const table = document.getElementById('moduleListTable');
//     table.innerHTML = 'Loading Modules...';

//     db.collection('modules')
//       .where('moduleGroup', '==', moduleGroup)
//       .get()
//       .then(querySnapshot => handleSnapshot(querySnapshot))
//       .catch(error => console.log('Error getting documents: ', error));
//   }
