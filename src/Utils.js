import firebase from "./firebase"

const db = firebase.firestore()
export const displayChatRoom = async (name, userId) => {
  const channelRef = db.collection("channels").doc(name)
  const doc = await channelRef.get()
  if (!doc.exist) {
    const data = {
      users: [userId],
    }
    channelRef.update(data)
  } else {
    console.log(doc.data())
  }
}

export const getChatRoom = async (currentChannel) => {
  const data = []
  await db
    .collection(`channels`)
    .doc(currentChannel)
    .collection(`${currentChannel}messages`).orderBy('createdAt')
    .onSnapshot((collectionSnapshot) => {
      collectionSnapshot.docChanges().forEach((doc) => {
         data.push(doc.doc.data())
      })
    })
    console.log(data)
    return data
  
}
