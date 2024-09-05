// src/pages/Home.jsx
import React from 'react';
import { SignUpButton, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Navigate } from 'react-router-dom';

function Home() {
    return (
        <>

            <SignedOut>
                <h1>welcome to you </h1>
            </SignedOut>
            <SignedIn>
                <Navigate to="/dashbord" />
            </SignedIn>
        </>
    );
}

export default Home;
