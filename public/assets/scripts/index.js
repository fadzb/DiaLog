console.log('index.js loaded');

// Initialize Firebase
const config = {
  apiKey: 'xxxxx',
  authDomain: 'xxxxx',
  databaseURL: 'xxxxx',
  projectId: 'xxxxx',
  storageBucket: 'xxxxx',
  messagingSenderId: 'xxxxx',
};
firebase.initializeApp(config);

// Reference firebase collection
const firebaseRef = firebase.database().ref('modules');

// Listen to form submit
document.getElementById('createModuleForm').addEventListener('submit', submitForm);

// TODO: Client Side Validation
// Handle form submit
function submitForm(e) {
  e.preventDefault();

  console.log('Handling Form Submit....');

  inputIds = ['moduleName', 'levelName', 'levelContent'];

  // map input Ids (keys) to input Values
  const inputObj = inputIds.map(inputId => {
    return { key: inputIds, value: getInputValue(inputId) };
  });

  console.log(inputObj);
}

// Get input values
function getInputValue(elementId) {
  return document.getElementById(elementId).value;
}
