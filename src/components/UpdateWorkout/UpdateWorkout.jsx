import React from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateWorkoutButton({ workoutId }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/workouts/${workoutId}/edit`);
    };

    return (
        <button onClick={handleClick} className="update-btn">
            Update
        </button>
    );
}
