import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader.jsx";
import WorkoutCard from "../components/WorkoutCard/WorkoutCard.jsx";
import FooterNav from "../components/FooterNav/FooterNav.jsx";

export default function DashboardPage({ user }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch user workouts (replace with your real API later)
    fetch(`/api/workouts/user/${user._id}`)
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => console.error("Failed to fetch workouts", err));
  }, [user]);

  return (
    <div className="dashboard-page">
      <DashboardHeader user={user} workouts={workouts} />
      
      <div className="workout-list">
        {workouts.map(workout => (
          <WorkoutCard key={workout._id} workout={workout} />
        ))}
      </div>

      <FooterNav />
    </div>
  );
}