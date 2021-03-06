// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const db = admin.firestore();

const serviceAccount = require("./endPointKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://quickrscan.firebaseio.com",
// });
if (!admin.apps.length) {
  const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quickrscan.firebaseio.com",
  });
}

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: true }));

app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello world!");
});

exports.callVision = functions.firestore
  .document("results/{document}")
  .onCreate((snap, context) => {
    console.log("SNAP", snap);
    console.log("CONTEXT", context);

    const data = snap.data();
    console.log("DATA IN IS", data);
    const filePath = "gs://" + data.bucket + "/" + data.fullPath;
    console.log("url is", filePath);

    return (async () => {
      const [data] = await client.textDetection(filePath);
      const detections = data.textAnnotations;

      db.collection("results")
        .doc(context.params.document)
        .update({
          // textResult: detections[0],
          textResult: detections,
        });
      console.log("Text:");
      console.log("data", detections[0]);
      console.log("data", detections);
      console.log("description ", detections.descriptions);
      //   console.log("Data", detections);
      //   detections.forEach((text) => console.log(text));
      //   console.log(data[0].textAnnotations);
    })()
      .then(() => console.log("success"))
      .catch((err) => console.log(" An error has occurred", err));
  });
