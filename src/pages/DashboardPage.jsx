import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader.jsx";
import WorkoutCard from "../components/WorkoutCard/WorkoutCard.jsx";
import FooterNav from "../components/FooterNav/FooterNav.jsx";




export default function DashboardPage({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const removeWorkout = (deletedId) => {
    setWorkouts((prev) => prev.filter((w) => w._id !== deletedId));
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token"); // or sessionStorage, etc.

        const res = await fetch("http://localhost:3000/api/users/:userId/workouts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await res.json();
        setWorkouts(data);
        console.log(data);

        if (data.length > 0) {
          const latest = data.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        }
      } catch (err) {
        console.error("❌ Error fetching workouts:", err);
      }
    };

    fetchWorkouts();
  }, []);
//   useEffect(() => {
//     // Fetch user workouts (replace with your real API later)
//     fetch(`/api/workouts/user/${user._id}`)
//       .then(res => res.json())
//       .then(data => setWorkouts(data))
//       .catch(err => console.error("Failed to fetch workouts", err));
//   }, [user]);

  return (
      <div className="dashboard-page">
        <DashboardHeader user={user} workouts={workouts} />

        <div className="workout-list">
          {workouts.map(workout => (
              <WorkoutCard key={workout._id} workout={workout} userId={user._id} onDelete={removeWorkout} />
          ))}
        </div>
        <FooterNav />
      </div>
  );
}