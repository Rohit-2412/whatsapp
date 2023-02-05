import '@/styles/globals.css'

import { addDoc, collection, doc, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

import Loading from '@/components/Loading'
import Login from './login'
import styles from '@/styles/Home.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        // update the values in the database each time user changes
        if (user) {
            setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                lastSeen: serverTimestamp(),
                photoURL: user.photoURL,
            })
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
