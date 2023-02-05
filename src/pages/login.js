import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";

const Login = () => {
    const provider = new GoogleAuthProvider();

    // function to sign in with google
    const signIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    return (
        <div className="grid place-items-center h-[100vh] bg-[#f6f6f6]">
            <Head>
                <title>Login</title>
            </Head>

            {/* container */}
            <div
                className="flex flex-col items-center justify-center bg-white p-24 rounded-lg
            drop-shadow-2xl"
            >
                <Image
                    alt="WhatsApp Logo"
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                    width={200}
                    className="mb-12"
                    height={200}
                />
                <Button onClick={signIn} variant="outlined">
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default Login;
