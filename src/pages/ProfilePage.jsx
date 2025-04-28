import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/ProfileForm/ProfileForm.jsx";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [initialProfile, setInitialProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const userId = decodedToken.payload._id;

                const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const user = await res.json();
                    if (user.profile) {
                        setInitialProfile(user.profile); // profile exists
                    }
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleProfileSubmit = async (formData) => {
        try {
            const token = localStorage.getItem("token");
            const method = initialProfile ? "PUT" : "POST";
            const url = `http://localhost:3000/api/users/profile`;

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const data = await res.json();
            navigate("/dashboard");
        } catch (error) {
            console.error("Failed to submit profile:", error);
            alert("Something went wrong saving your profile. Try again!");
        }
    };

    if (loading) return <p>Loading Profile...</p>;

    return (
        <div className="profile-page">
            <h1>{initialProfile ? "Edit Your Profile" : "Create Your FitSync Profile"}</h1>
            <ProfileForm initialData={initialProfile} onSubmit={handleProfileSubmit} />
        </div>
    );
}
