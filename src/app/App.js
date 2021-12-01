import '../style/App.css';
import Header from '../common/header/Header';
import Navbar from '../common/navbar/Navbar.jsx';
import Player from '../common/player/Player';
import { BrowserRouter } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavigationUrl from '../routes/NavigationUrl';
import Playlist from '../common/playlist/Playlist';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { signedIn } from '../actions/user';

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};
firebase.initializeApp(config);

function App() {

  const dispatch = useDispatch();
  // const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if(!user){
        console.log("user logout");
        return;
      }
      else{
        console.log("user login");
        const currentUser = await user;
        const actionSignIn = signedIn(currentUser);
        dispatch(actionSignIn);
      }
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <BrowserRouter>
      <div className="app container-fluid">
        <div className="row">
          <Navbar />
          <Header />
          <div className="col-2" style={{zIndex: -1}}></div>
          <div className="col-10 content col-mid">
            <NavigationUrl />
          </div>
          <Playlist />
          <Player />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
