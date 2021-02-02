import React from "react"
import firebase from "firebase"
import "./SignIn.css"
const SignIn = () => {
  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider)
  }
  return (
    <div className="signin-container">
      <img src="../../images/logo.png" alt="logo" />
      <h1>Sign in with Google Account</h1>
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}

export default SignIn
