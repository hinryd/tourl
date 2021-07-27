import firebase from 'firebase-admin'
import serviceAccount from '../tourl-2a47a-aeb0fa13b3d7.json'

if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    })
}

const db = firebase.firestore()

export default db
