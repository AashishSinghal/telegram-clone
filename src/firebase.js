import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBuHZfThLXRDaf1yB-HcIU832Ewv9Nkojk",
  authDomain: "telegram-clone-f2084.firebaseapp.com",
  projectId: "telegram-clone-f2084",
  storageBucket: "telegram-clone-f2084.appspot.com",
  messagingSenderId: "393650898733",
  appId: "1:393650898733:web:37da757c12deb299e275a4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
