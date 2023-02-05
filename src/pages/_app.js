import '@/styles/globals.css'

import { auth, db } from '../../firebase'

import Loading from '@/components/Loading'
import Login from './login'
import firebase from 'firebase'
import styles from '@/styles/Home.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        // update the values in the database each time user changes
        if (user) {
            db.collection('users').doc(user.uid).set(
                {
                    email: user.email,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
                    photoURL: user.photoURL,
                },
                { merge: true }
            )
        }
    }, [user])

    if (loading) return <Loading />
    if (!user)
        return (
            <main className={styles.main}>
                <Login />
            </main>
        )
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}
