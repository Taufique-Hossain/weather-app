import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// Client config from firebase-config.json (do NOT use firebase-key.json here — that is a service account key for server-side only)
import firebaseConfig from '../../firebase-config.json'

let app: FirebaseApp | null = null

export function getFirebaseApp(): FirebaseApp | null {
  const config = firebaseConfig as { apiKey?: string; authDomain?: string; projectId?: string; storageBucket?: string; messagingSenderId?: string; appId?: string }
  if (!config.apiKey || !config.projectId) return null
  if (!app) {
    app = initializeApp(config)
  }
  return app
}

export function getDb() {
  const firebaseApp = getFirebaseApp()
  if (!firebaseApp) return null
  return getFirestore(firebaseApp)
}
