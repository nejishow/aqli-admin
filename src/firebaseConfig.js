import firebase from "firebase/app";
import "firebase/storage";
var config = {
  apiKey: "AIzaSyDQdCHc1egdH-9lHgkB_7OydIqu1eNjBBU",
  authDomain: "aqli-admin.firebaseapp.com",
  databaseURL: "https://aqli-admin.firebaseio.com",
  projectId: "aqli-admin",
  storageBucket: "aqli-admin.appspot.com",
  messagingSenderId: "173666950885",
  appId: "1:173666950885:web:140293666792d34479be0c",
  measurementId: "G-48PF2N887K"
};
firebase.initializeApp(config);
const storage = firebase.storage;
export { storage };
