import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref as databaseRef,
  set,
  push,
  get,
} from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "birthdayreminder-23004.firebaseapp.com",
  projectId: "birthdayreminder-23004",
  storageBucket: "birthdayreminder-23004.appspot.com",
  messagingSenderId: "406859573516",
  appId: "1:406859573516:web:70c0a98f665e1e646d4129",
  measurementId: "G-D0WD8EV207"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const reference = databaseRef(db, "birthdaysList/");

export const writeData = (name, dob, imageUrl) => {
  const newReference = push(reference);

  set(newReference, {
    name: name,
    dob: dob,
    image: imageUrl,
  });
};

export const readData = () => {
  return get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = [];
        snapshot.forEach((childSnap) => {
          data.push({ id: childSnap.key, ...childSnap.val() });
        });
        return data;
      }
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

const storage = getStorage(app);

const getUrl = (name) => {
  const downloadReference = storageRef(storage, `images/${name}`);
  return getDownloadURL(downloadReference)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          console.log("file doesnt exist");
          break;
        case "storage/unauthorized":
          console.log("unauthorized acess");
          break;
        case "storage/canceled":
          console.log("cancelled upload");
          break;
        case "storage/unknown":
          console.log("unkown error");
          break;
        default:
          console.log("Some error occured");
      }
    });
};

export const getImageUrl = (file, name, callback) => {
  const uploadReference = storageRef(storage, `images/${name}`);

  uploadBytes(uploadReference, file).then((snapshot) => {
    getUrl(name).then((url) => {
      callback(url);
    });
  });
};
