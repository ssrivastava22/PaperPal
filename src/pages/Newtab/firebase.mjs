import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, collection, where, getDocs, query, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "hidden",
  authDomain: "hidden",
  projectId: "hidden",
  storageBucket: "hidden",
  messagingSenderId: "hidden",
  appId: "hidden",
  measurementId: "hidden"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };

async function addUser(userInfo) {
  try {

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("email", "==", userInfo.email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.error('Email already signed up');
      return;
    }


    const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    console.log('Auth user created with UID: ', userCredential.user.uid);


    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
      name: userInfo.name,
      email: userInfo.email,
      education: userInfo.education,
      expertiseLevel: userInfo.expertiseLevel,
      fieldOfInterest: userInfo.fieldOfInterest
    });
    console.log('User added with ID: ', userCredential.user.uid);
  } catch (e) {
    console.error('Error adding user: ', e);
  }
}




addUser({
  name: 'John Doe',
  email: 'johndoe4@example.com',
  password: 'password123', 
  education: 'Bachelor of Science in Computer Science',
  expertiseLevel: 'Intermediate',
  fieldOfInterest: 'Machine Learning'
});

addUser({
  name: 'Jane Smith',
  email: 'janesmith4@example.com',
  password: 'password456',
  education: 'Bachelor of Science in Computer Science',
  expertiseLevel: 'Intermediate',
  fieldOfInterest: 'Machine Learning'
});
