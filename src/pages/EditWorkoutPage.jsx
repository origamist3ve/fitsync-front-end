import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditWorkoutPage() {
    const { workoutId } = useParams();
    const navigate = useNavigate();

    const [workoutData, setWorkoutData] = useState({
        workoutType: "",
        workout: "",
        duration: "",
        date: "",
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
                    workoutType: data.workoutType,
                    workout: data.workout,
                    duration: data.duration,
                    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
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
        setWorkoutData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const userId = decodedToken.payload._id;

            // 🛠 Convert date string into a timestamp (milliseconds)
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
                body: JSON.stringify(updatedWorkoutData), // send updated version
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
                <label>
                    Workout Type:
                    <input
                        type="text"
                        name="workoutType"
                        value={workoutData.workoutType}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <label>
                    Workout Description:
                    <input
                        type="text"
                        name="workout"
                        value={workoutData.workout}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <label>
                    Duration (mins):
                    <input
                        type="number"
                        name="duration"
                        value={workoutData.duration}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={workoutData.date}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <button type="submit">Update Workout</button>
            </form>
        </div>
    );
}
