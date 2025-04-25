import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import WorkoutForm from "../components/AddWorkoutForm/AddWorkoutForm.jsx";

export default function WorkoutDetailsPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchWorkout = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch workout");
      const data = await res.json();
      setWorkout(data);
    } catch (err) {
      console.error("Error fetching workout:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleWorkoutUpdated = () => {
    setIsEditing(false);
    fetchWorkout();
  };

  if (isEditing) {
    return <WorkoutForm workout={workout} onWorkoutUpdated={handleWorkoutUpdated} />;
  }

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Workout Details</h2>
      <div>
        <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {new Date(workout.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p><strong>Type:</strong> {workout.type}</p>
        <p><strong>Duration:</strong> {workout.duration} minutes</p>
      </div>
      <button onClick={handleEdit}>Edit Workout</button>
    </main>
  );
}