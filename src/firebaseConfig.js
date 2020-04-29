import firebase from "firebase/app";
import "firebase/storage";
var config = {
  apiKey: "AIzaSyBK9wXHdgOuhR9CH0R4VCXVaNr4HIuA4SI",
  authDomain: "aqli-backend.firebaseapp.com",
  databaseURL: "https://aqli-backend.firebaseio.com",
  projectId: "aqli-backend",
  storageBucket: "aqli-backend.appspot.com",
  messagingSenderId: "796968195430",
  appId: "1:796968195430:web:f2f567614dc99a5deba4a7",
  measurementId: "G-FV5865NGCM"
};
firebase.initializeApp(config);
const storage = firebase.storage;
export { storage };
