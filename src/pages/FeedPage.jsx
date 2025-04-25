import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutCard from "../components/WorkoutCard/WorkoutCard.jsx";
import FooterNav from "../components/FooterNav/FooterNav.jsx";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader.jsx";
import "./FeedPage.css";

export default function FeedPage({ user }) {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/sign-in");
                    return;
                }

                const res = await fetch("http://localhost:3000/api/workouts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch feed");
                }

                const data = await res.json();
                setWorkouts(data);
            } catch (err) {
                console.error("Error fetching feed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="feed-page">
            <h2>Workout Feed</h2>
            
            {loading && <p className="loading-message">Loading feed...</p>}

            <div className="workout-list">
                {workouts.length === 0 && !loading && (
                    <p className="no-workouts-message">No workouts have been posted yet.</p>
                )}

                {workouts.map((workout) => (
                    <WorkoutCard 
                        key={workout._id} 
                        workout={workout} 
                        user={user}
                    />
                ))}
            </div>

            <FooterNav />
        </div>
    );
}
