import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteWorkoutsButton from "../DeleteWorkout/DeleteWorkout.jsx";

export default function WorkoutCard({ workout,onDelete,userId } ) {
  const navigate = useNavigate();

  return (
    <div
      className="workout-card"
      style={{
        borderBottom: "1px solid #ddd",
        padding: "1rem",
      }}
    >
      <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {new Date(workout.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
        <p><strong>Workout:</strong> {workout.workout}</p>
      <p><strong>Duration:</strong> {workout.duration} minutes</p>
        <DeleteWorkoutsButton
            workoutId={workout._id}
            userId={userId}
            onDelete={onDelete}
        />

    </div>
  );
}