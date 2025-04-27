// src/components/Footer/Footer.jsx
import React from "react";
import "./Footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>© {currentYear} FitSync. All rights reserved.</p>
            <p className="small-text">Built with 💪 by the FitSync team</p>
        </footer>
    );
}
