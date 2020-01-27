console.log('index.js loaded');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyByInVHZ80SHg8Jfy7Tu4Wc9pO0nYLz-Uc',
  authDomain: 'healthyapp-289a0.firebaseapp.com',
  projectId: 'healthyapp-289a0',
});

// reference to firestore db
const db = firebase.firestore();

// Listen to form submit
document.getElementById('createModuleForm').addEventListener('submit', submitForm);

// TODO: Client Side Validation
// Handle form submit
function submitForm(e) {
  e.preventDefault();

  const inputObject = {
    moduleName: getInputValue('moduleName'),
    levelName: getInputValue('levelName'),
    levelContent: getInputValue('levelContent'),
  };

  // Add new module to modules collection
  addModule(inputObject);
}

// Get input values
function getInputValue(elementId) {
  return document.getElementById(elementId).value;
}

function addModule(moduleObject) {
  // Adds module with a chosen "docId"
  // db.collection('modules')
  //   .doc('docId')
  //   .set(moduleObject)
  //   .then(docRef => console.log(docRef))
  //   .catch(error => console.log(error));

  // Add with random id
  db.collection('modules')
    .add(moduleObject)
    .then(docRef => console.log(docRef))
    .catch(error => console.log(error));
}
