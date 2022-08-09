import { initializeApp } from "firebase/app"
import { getDatabase, ref as databaseRef, set, push, get } from "firebase/database"
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD5E41aoB1E6eaSBztzdXBQJK0t7gT6xQ0",
    authDomain: "birthday-reminder-2d93d.firebaseapp.com",
    databaseURL: "https://birthday-reminder-2d93d-default-rtdb.firebaseio.com",
    projectId: "birthday-reminder-2d93d",
    storageBucket: "birthday-reminder-2d93d.appspot.com",
    messagingSenderId: "507306883317",
    appId: "1:507306883317:web:f783b3726a1ef5a1b2adbc",
    measurementId: "G-6KTFJ20GBJ"
  };

  const app= initializeApp(firebaseConfig)
  const db= getDatabase(app)
  const reference= databaseRef(db, 'birthdaysList/')


  export const writeData=(name, dob, imageUrl)=>{
    const newReference = push(reference)
    
    set(newReference, {
        name: name,
        dob: dob,
        image: imageUrl
    })
  }

export const readData=()=>{
  return get(reference).then(
    (snapshot) => {
      if(snapshot.exists()){
        const data=[]
        snapshot.forEach((childSnap) => {
          data.push({ id: childSnap.key, ...childSnap.val() });
        });
        return data
      }
    }
  ).catch((error)=>{
    console.log(error)
    return []
  })
  
}

const storage= getStorage(app)

const getUrl=(name)=>{
  const downloadReference = storageRef(storage, `images/${name}`)
  return getDownloadURL(downloadReference).then((url)=>{
    return url
  }).catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        console.log('file doesnt exist')
        break;
      case 'storage/unauthorized':
        console.log('unauthorized acess')
        break;
      case 'storage/canceled':
        console.log('cancelled upload')
        break;
      case 'storage/unknown':
        console.log('unkown error')
        break;
    }})
}

export const getImageUrl=(file, name, callback)=>{
  const uploadReference = storageRef(storage, `images/${name}`)

  uploadBytes(uploadReference, file).then((snapshot)=>{
    getUrl(name).then((url)=>{
      callback(url)
    })

  })
}


