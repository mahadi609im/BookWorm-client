// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDqn1Wv6TpfuA68tUtx6DzURONxGVN75kk',
  authDomain: 'bookworm-77527.firebaseapp.com',
  projectId: 'bookworm-77527',
  storageBucket: 'bookworm-77527.firebasestorage.app',
  messagingSenderId: '823281454592',
  appId: '1:823281454592:web:daff77393293ff8088d2e5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
