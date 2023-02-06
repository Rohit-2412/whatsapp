import { auth, provider } from "../../firebase";

import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";

const Login = () => {

    // function to sign in with google
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

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
                    priority={true}
                />
                <Button onClick={signIn} variant="outlined">
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default Login;
