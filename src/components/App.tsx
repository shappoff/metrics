import {default as React} from 'react';

import firebase from "firebase";

const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
} = env;

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

import FindMetrics from "./FindMetrics";

const app = firebase.initializeApp(firebaseConfig);

const App = () => {
    const [isAuthed, setIsAuthed] = React.useState(false);

    const authWithGoogle = () => {

        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result: any) => {
                var isNewUser = result.additionalUserInfo.isNewUser;
                if (isNewUser) {
                    //delete the created user
                    result.user.delete();
                    console.info('There no access!');
                } else {
                    // your sign in flow
                    // console.log('user ' + result.user.email + ' does exist!');
                    // console.log(result);
                    setIsAuthed(true);
                }
            }).catch((error: any) => {
            console.error(error);
        });

    };

    return isAuthed ? <FindMetrics /> : <button className="btn btn-primary type-table" onClick={authWithGoogle}>Google</button>
};

export default App;