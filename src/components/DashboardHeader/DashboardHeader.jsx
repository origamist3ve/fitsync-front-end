import React from "react";

export default function DashboardHeader({ user, workouts = [] }) {
  if (!user) return <p>Loading user data...</p>;

  const lastWorkoutDate = workouts.length
    ? new Date(workouts[0].date) // assumes newest first
    : null;

  const daysSinceLast = lastWorkoutDate
    ? Math.floor((Date.now() - new Date(lastWorkoutDate)) / (1000 * 60 * 60 * 24))
    : "—";

  return (
    <header style={{ padding: "1rem", backgroundColor: "#fffaf0" }}>
      <h1>Welcome, {user.username}!</h1>
      <p>
        It's been <strong>{daysSinceLast}</strong> day{daysSinceLast === 1 ? "" : "s"} since your last workout
      </p>
    </header>
  );
}