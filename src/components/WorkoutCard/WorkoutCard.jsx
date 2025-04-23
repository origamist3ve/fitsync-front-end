import React from "react";
import { useNavigate } from "react-router-dom";

export default function WorkoutCard({ workout }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/workouts/${workout._id}`)}
      className="workout-card"
      style={{
        borderBottom: "1px solid #ddd",
        padding: "1rem",
        cursor: "pointer"
      }}
    >
      <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {new Date(workout.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>Type:</strong> {workout.type}</p>
      <p><strong>Duration:</strong> {workout.duration} minutes</p>
    </div>
  );
}