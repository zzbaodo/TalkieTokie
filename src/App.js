import "./App.css"
import firebase from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Signin from "./layout/SignIn"
import UserInterface from "./layout/UserInterface"
import UserState from "./context/user/UserState"
import MessageState from "./context/message/MessageState"

function App() {
  const auth = firebase.auth()
  const [user] = useAuthState(auth)
  localStorage.setItem("user", JSON.stringify(user))
  return (
    <>
      <MessageState>
        <UserState>
          <div className="background">
            <div className="app-container">
              {user ? (
                <UserInterface />
              ) : (
                <>
                  <Signin />
                </>
              )}
            </div>
            <div className="circle1"></div>
            <div className="circle2"></div>
          </div>
        </UserState>
      </MessageState>
    </>
  )
}

export default App
