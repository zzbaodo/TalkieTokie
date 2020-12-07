import "./App.css"
import firebase from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Signin from "./SignIn"
import UserInterface from "./layout/UserInterface"
import UserState from "./context/user/UserState"

function App() {
  const auth = firebase.auth()
  const [user] = useAuthState(auth)
  localStorage.setItem("user", JSON.stringify(user))
  return (
    <>
      <UserState>
        <div className="app-container">
          {user ? (
            <UserInterface />
          ) : (
            <h3>
              <Signin />
            </h3>
          )}
        </div>
      </UserState>
    </>
  )
}

export default App
