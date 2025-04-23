import React from "react";

export default function DashboardHeader({ user, workouts }) {
  const lastWorkoutDate = workouts.length
    ? new Date(workouts[0].date) // assuming workouts are sorted newest first
    : null;

  const daysSinceLast = lastWorkoutDate
    ? Math.floor((Date.now() - new Date(lastWorkoutDate)) / (1000 * 60 * 60 * 24))
    : "—";

  return (
    <header style={{ padding: "1rem", backgroundColor: "#fffaf0" }}>
      <h1>Welcome, {user.username}!</h1>
      <p>It's been <strong>{daysSinceLast}</strong> days since your last workout</p>
    </header>
  );
}