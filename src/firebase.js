import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDTEUY0L-31pWdaaKBuBLdmcd9SkZIGfag",
    authDomain: "sistema-solicitudes.firebaseapp.com",
    projectId: "sistema-solicitudes",
    storageBucket: "sistema-solicitudes.appspot.com",
    messagingSenderId: "188045067695",
    appId: "1:188045067695:web:f062c2e1d1ca5a14f11b5a"
  };
  
  // Initialize Firebase
  app.initializeApp(firebaseConfig);
  const db = app.firestore()
  const auth = app.auth()
  export {db, auth}