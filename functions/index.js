const functions = require('firebase-functions');
var spawn = require('child_process').spawn;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Not doing this atm
// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();

// TODO: Either this or use Firebase ML Kit
// exports.processImage = functions.https.onRequest((req, res) => {
//   var process = spawn('python', ['./processImage.py', req.query.firstname, req.query.lastname]);

//   process.stdout.on('data', function(data) {
//     res.send(data.toString());
//   });
// });

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

//https://www.geeksforgeeks.org/run-python-script-node-js-using-child-process-spawn-method/
exports.helloWorldFromPython = functions.https.onRequest((req, res) => {
  var process = spawn('python', ['./hello.py', req.query.firstname, req.query.lastname]);

  process.stdout.on('data', function(data) {
    res.send(data.toString());
  });
});
