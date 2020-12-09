import React from "react"
import firebase from "firebase"
const SignIn = () => {
  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
     await firebase.auth().signInWithPopup(provider)
     
  }
  return (
    <>
      <button onClick={signIn}>Sign In</button>
    </>
  )
}

export default SignIn
