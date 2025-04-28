import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import workoutOptions from "../components/WorkoutOptions/WorkoutsOptions.jsx";

export default function EditWorkoutPage() {
    const { workoutId } = useParams();
    const navigate = useNavigate();

    const [workoutData, setWorkoutData] = useState({
        workoutType: "",
        workout: "",
        duration: "",
        date: "",
        sets: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/workouts/${workoutId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch workout");

                const data = await res.json();
                setWorkoutData({
                    workoutType: data.workoutType || "",
                    workout: data.workout || "",
                    duration: data.duration || "",
                    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
                    sets: data.sets || "",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [workoutId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setWorkoutData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "workoutType" && { workout: "" }), 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const userId = decodedToken.payload._id;

            const updatedWorkoutData = {
                ...workoutData,
                date: new Date(workoutData.date).getTime(),
            };

            const res = await fetch(`http://localhost:3000/api/users/${userId}/workouts/${workoutId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedWorkoutData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to update workout: ${errorText}`);
            }

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading workout...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div className="edit-workout-page">
            <h2>Edit Workout</h2>
            <form onSubmit={handleSubmit}>
                {/* Workout Type select */}
                <div>
                    <label>Workout Type:</label>
                    <select
                        name="workoutType"
                        value={workoutData.workoutType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select a Workout Type --</option>
                        {Object.keys(workoutOptions).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Workout select */}
                <div>
                    <label>Workout:</label>
                    <select
                        name="workout"
                        value={workoutData.workout}
                        onChange={handleChange}
                        required
                        disabled={!workoutData.workoutType}
                    >
                        <option value="">-- Select a Workout --</option>
                        {workoutData.workoutType &&
                            workoutOptions[workoutData.workoutType].map((workout) => (
                                <option key={workout} value={workout}>
                                    {workout}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Sets input */}
                <div>
                    <label>Sets:</label>
                    <input
                        type="number"
                        name="sets"
                        value={workoutData.sets}
                        onChange={handleChange}
                        min="1"
                        max="20"
                        required
                    />
                </div>

                {/* Duration input */}
                <div>
                    <label>Duration (minutes):</label>
                    <input
                        type="number"
                        name="duration"
                        value={workoutData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Date input */}
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={workoutData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Update Workout</button>
            </form>
        </div>
    );
}
