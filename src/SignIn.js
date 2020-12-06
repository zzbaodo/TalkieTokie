import React from "react"
import firebase from "firebase"
const SignIn = () => {
  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken
        const user = result.user
        console.log(user)
      })
  }
  return <button onClick={signIn}>Sign In</button>
}

export default SignIn
