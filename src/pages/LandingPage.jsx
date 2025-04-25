// src/pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
// import WelcomeHeader from "../components/WelcomeHeader.jsx";
// import AuthButtons from "../components/AuthButtons.jsx";

export default function LandingPage() {
    const navigate = useNavigate();

    const handleSignIn = () => navigate("/sign-in");
    const handleSignUp = () => navigate("/sign-up");

    return (
        <div className="landing-page">
            <header className="welcome-header">
                <h1>Welcome to FitSync</h1>
                <p>Your all-in-one fitness tracking companion</p>
            </header>

        </div>
    );
}
