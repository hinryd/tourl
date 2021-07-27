import firebase from 'firebase-admin'

if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
    })
}

const db = firebase.firestore()

export default db
