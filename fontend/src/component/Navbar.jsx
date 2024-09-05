import React, { useState, useEffect } from 'react';
import { SignUpButton, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function Navbar() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Financial Tracker</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>

                <button className="btn btn-outline" onClick={toggleTheme}>
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>

                <SignedOut>
                    <SignUpButton
                        mode="modal"
                        className="btn btn-outline btn-primary"
                    />
                    <SignInButton
                        mode="modal"
                        className="btn btn-outline btn-secondary"
                    />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
}

export default Navbar;
