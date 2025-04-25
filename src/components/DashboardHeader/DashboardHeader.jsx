import React from "react";
import "./DashboardHeader.css";

export default function DashboardHeader({ user, workouts = [] }) {
  if (!user) return <p>Loading user data...</p>;

  const lastWorkoutDate = workouts.length
    ? new Date(workouts[0].date) // assumes newest first
    : null;

  const daysSinceLast = lastWorkoutDate
    ? Math.floor((Date.now() - new Date(lastWorkoutDate)) / (1000 * 60 * 60 * 24))
    : "—";

  return (
    <header className="dashboard-header">
      <h1 className="welcome-text">
        Welcome, <span className="username">{user.username}</span>!
      </h1>
      <p className="stats-text">
        It's been <strong>{daysSinceLast}</strong> day{daysSinceLast === 1 ? "" : "s"} since your last workout
      </p>
    </header>
  );
}