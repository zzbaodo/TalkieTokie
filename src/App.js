import "./App.css"
import firebase from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import Signin from "./SignIn"
import ChatRoom from "./ChatRoom"


function App() {
  const auth = firebase.auth()
  const [user] = useAuthState(auth)
  console.log(user)
  return (
    <div className="App">
      {user ? (
        <ChatRoom user={user && user} auth={auth} />
      ) : (
        <h3>
          <Signin />
        </h3>
      )}
    </div>
  )
}

export default App
