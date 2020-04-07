console.log('index.js loaded');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyByInVHZ80SHg8Jfy7Tu4Wc9pO0nYLz-Uc',
  authDomain: 'healthyapp-289a0.firebaseapp.com',
  projectId: 'healthyapp-289a0',
});

// reference to firestore db
const db = firebase.firestore();

// Listen to form preview
document.getElementById('moduleContent').addEventListener('input', handleInput);

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
  // Prevent Default
  e.preventDefault();

  // Wrap module content in custom tag
  const content = `<i> ${document.getElementById('moduleContent').innerHTML} </i>`;

  const inputObject = {
    moduleGroup: getInputValue('moduleGroup'),
    moduleName: getInputValue('moduleName'),
    desc: getInputValue('moduleDesc'),
    moduleContent: content,
  };

  // Clear Form
  e.target.reset();
  document.getElementById('moduleContent').innerHTML = '';

  // Add new module to modules collection
  addModule(inputObject);
}

// Get input values
function getInputValue(elementId) {
  return document.getElementById(elementId).value;
}

function addModule(moduleObject) {
  // Add with random id
  db.collection('modules')
    .add(moduleObject)
    .then(docRef => alert(`Module Submitted`))
    .catch(error => console.log(error));
}

// Accessibility bug: tabbing from last item in table to Load Modules button fires event
function handleBlur(e) {
  const submitButton = document.getElementById('loadModules');

  if (e.relatedTarget == submitButton) {
    const moduleGroup = e.target.innerHTML;
    getModules(moduleGroup);
  }
}

function getModules(moduleGroup) {
  // ref to the table
  const table = document.getElementById('moduleListTable');
  table.innerHTML = 'Loading Modules...';

  db.collection('modules')
    .where('moduleGroup', '==', moduleGroup)
    .get()
    .then(querySnapshot => handleSnapshot(querySnapshot))
    .catch(error => console.log('Error getting documents: ', error));
}

function handleSnapshot(querySnapshot) {
  // ref to the table
  const table = document.getElementById('moduleListTable');

  // First clear table
  table.innerHTML = null;

  if (querySnapshot.size < 1) {
    table.innerHTML = 'No Modules Found';
    return;
  }

  querySnapshot.forEach(doc => {
    console.log(doc.id, ' => ', doc.data());

    //get data from doc
    const data = doc.data();

    //Create row and cell element and set inner html
    const row = document.createElement('tr');
    const cell = row.insertCell();
    cell.innerHTML = data.moduleName;
    cell.tabIndex = 0;
    cell.onclick = event => previewModule(event, data);

    //Appened row to table
    table.appendChild(row);
  });
}

function previewModule(e, data) {
  // Subject to how Modules will actually look on phone

  // ref to content container
  const content = document.getElementById('content');

  // Set inner html
  content.innerHTML = data.moduleContent;
}

// event listener to update preview on text change
function handleInput(e) {
  // ref to content container
  const content = document.getElementById('content');

  const toPreview = document.getElementById('moduleContent');

  // Set inner html
  content.innerHTML = toPreview.innerHTML;
}
