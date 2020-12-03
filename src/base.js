import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAWWvotNpMCsuplmLxPuxlkyp3mP1QIL1o",
    authDomain: "spice-beanery.firebaseapp.com",
    databaseURL: "https://spice-beanery-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;