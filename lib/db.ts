import firebase from 'firebase-admin'

if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(process.env.SERVICE_KEY ?? '')
    })
}

const db = firebase.firestore()

export default db
