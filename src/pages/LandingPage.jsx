import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx"; 
import "./LandingPage.css";

export default function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSignIn = () => navigate("/sign-in");
    const handleSignUp = () => navigate("/sign-up");

    return (
        <div className="landing-page">
            <header className="welcome-header">
                <h1 className="title">Welcome to <span className="highlight">FitSync</span></h1>
                <p className="subtitle">Your all-in-one fitness tracking companion</p>

                <div className="button-group">
                    <button className="primary-btn" onClick={handleSignIn}>
                        Sign In
                    </button>
                    <button className="secondary-btn" onClick={handleSignUp}>
                        Sign Up
                    </button>
                </div>
            </header>

            {/* Motivational Carousel */}
            <section className="carousel-section">
                <div className="carousel-track">
                    <div className="carousel-item">"Transform your potential into power" 🔥</div>
                    <div className="carousel-item">"Stronger every day" 💪</div>
                    <div className="carousel-item">"Sweat is your fat crying" 😅</div>
                    <div className="carousel-item">"Believe in the process" 🏁</div>
                </div>
            </section>

            {/* Footer here */}
            <Footer />
        </div>
    );
}
