import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteWorkoutsButton from "../DeleteWorkout/DeleteWorkout.jsx";
import UpdateWorkoutButton from "../UpdateWorkout/UpdateWorkout.jsx";

export default function WorkoutCard({ workout, onDelete, onUpdate, userId, showDelete = false }) {
    const isOwner = workout.user === userId || workout.user?._id === userId;

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(workout.comments || []);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setLoading(true);

        try{
            const res = await fetch(
                `http://localhost:3000/api/workouts/${workout._id}/comments`,

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ text: comment }),
                }
            );
            const updatedComments = await res.json();
            setComments(updatedComments);
            setComment("");
        } catch (err) {
            alert("Failed to post comment");
        } finally {
            setLoading(false);
        }
    };

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

            {showDelete && isOwner && (
                <>
                    <DeleteWorkoutsButton
                        workoutId={workout._id}
                        userId={userId}
                        onDelete={onDelete}
                    />
                    <UpdateWorkoutButton workoutId={workout._id} />
                </>
            )}



            <div className="comments-section" onClick={e => e.stopPropagation()}>
                <ul>
                    <h2>Comments</h2>
                    {comments.map((c, idx) => (
                        <li key={idx}>
                            <strong>{c.author?.username || "User"}:</strong> {c.text}
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        placeholder="Add a comment.."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}
