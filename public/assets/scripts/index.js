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

// Listen to view module table
const els = document.getElementsByClassName('moduleGroupTD');
for (let el of els) {
  el.addEventListener('blur', handleBlur);
}

// TODO: Client Side Validation
// Handle form submit
function submitForm(e) {
  e.preventDefault();

  const inputObject = {
    moduleGroup: getInputValue('moduleGroup'),
    moduleName: getInputValue('moduleName'),
    moduleContent: getInputValue('moduleContent'),
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

function handleBlur(e) {
  const submitButton = document.getElementById('loadModules');

  if (e.relatedTarget == submitButton) {
    const moduleGroup = e.target.innerHTML;
    fetchModules(moduleGroup);
  }
}

function fetchModules(moduleGroup) {
  console.log(moduleGroup);
}
