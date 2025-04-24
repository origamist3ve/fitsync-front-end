import React, { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard/WorkoutCard.jsx";
import FooterNav from "../components/FooterNav/FooterNav.jsx";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader.jsx";

export default function FeedPage({ user }) {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem("token");

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
            <h2> All Workouts</h2>
        
        {loading && <p> Loading feed...</p>}

        <div className="workout-list">
            {workouts.length === 0 && !loading && (
                <p>No workouts have been posted yet.</p>
            )}

            {workouts.map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} />
            ))}

        </div>

        <FooterNav />
        
        </div>
    );

}
