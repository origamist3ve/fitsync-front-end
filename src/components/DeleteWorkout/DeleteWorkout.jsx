import React from "react";

export default function DeleteWorkoutButton({ workoutId, userId, onDelete }) {
    const handleDelete = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:3000/api/users/${userId}/workouts/${workoutId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete workout");
            }

            onDelete(workoutId);
        } catch (err) {
            console.error("❌ Error deleting workout:", err.message);
        }
    };

    return (
        <button onClick={handleDelete} className="delete-btn">
            Delete
        </button>
    );
}
