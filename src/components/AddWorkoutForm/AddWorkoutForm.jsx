import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWorkout } from "../../services/workoutService";
import "./AddWorkoutForm.css";

const workoutOptions = {
  Chest: [
    "Flat Barbell Bench Press",
    "Incline Dumbbell Press",
    "Push-ups",
    "Chest Fly (Machine)",
    "Cable Crossover",
    "Decline Barbell Bench Press",
    "Dumbbell Chest Press",
  ],
  Biceps: [
    "Barbell Bicep Curl",
    "Dumbbell Hammer Curl",
    "Preacher Curl",
    "Concentration Curl",
    "EZ-Bar Curl",
    "Cable Bicep Curl",
    "Zottman Curl",
  ],
  Shoulders: [
    "Overhead Barbell Press",
    "Seated Dumbbell Press",
    "Lateral Raises",
    "Front Dumbbell Raise",
    "Face Pulls",
    "Arnold Press",
    "Reverse Fly",
  ],
  Legs: [
    "Barbell Squat",
    "Walking Lunges",
    "Leg Press Machine",
    "Romanian Deadlift",
    "Calf Raises",
    "Bulgarian Split Squat",
    "Step-ups with Dumbbells",
  ],
  Back: [
    "Pull-ups",
    "Deadlifts",
    "Seated Cable Row",
    "Bent-over Barbell Row",
    "Lat Pulldown",
    "T-Bar Row",
    "Straight-Arm Pulldown",
  ],
  Triceps: [
    "Tricep Rope Pushdown",
    "Skull Crushers",
    "Close-Grip Bench Press",
    "Overhead Dumbbell Extension",
    "Dips (Parallel Bars)",
  ],
  Core: [
    "Planks",
    "Hanging Leg Raises",
    "Russian Twists",
    "Bicycle Crunches",
    "Mountain Climbers",
    "V-Ups",
    "Flutter Kicks",
  ],
  Swimming: [
    "Freestyle Laps",
    "Breaststroke",
    "Backstroke",
    "Butterfly Stroke",
    "Underwater Kicking Drills",
    "Flip Turns Practice",
    "Sprint Intervals (50m)",
  ],
  Cardio: [
    "Treadmill Running",
    "Outdoor Running",
    "Jump Rope",
    "Stationary Bike",
    "Rowing Machine",
    "Elliptical Trainer",
    "Stair Climber",
  ],
  HIIT: [
    "Tabata Circuit",
    "Burpees",
    "High Knees",
    "Jump Squats",
    "Battle Ropes",
    "Box Jumps",
    "Mountain Climbers",
  ],
  Flexibility: [
    "Yoga Session",
    "Static Stretching",
    "Dynamic Stretching",
    "Pigeon Pose",
    "Downward Dog",
    "Seated Forward Fold",
    "Hip Flexor Stretch",
  ],
  Mobility: [
    "Foam Rolling",
    "Ankle Mobility Drills",
    "Shoulder Mobility Circles",
    "Hip Openers",
    "Spinal Twists",
  ],
  Egaming: [
    "Posture Correction Stretching",
    "Neck Mobility Routine",
    "Wrist Flexibility Drills",
    "Seated Core Stabilization",
    "Forearm Strengthening with Light Dumbbells",
    "Eye Relaxation Exercises",
    "Finger Stretching and Hand Mobility",
  ],
  Boxing: [
    "Heavy Bag Work",
    "Speed Bag Training",
    "Shadow Boxing",
    "Jump Rope Warm-up",
    "Focus Mitts Drills",
    "Defensive Slipping Drills",
  ],
  Crossfit: [
    "AMRAP Workouts",
    "EMOM Routines",
    "Kettlebell Swings",
    "Wall Balls",
    "Double-unders",
    "Thrusters",
  ],
};


const AddWorkoutForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workoutType: "",
    workout: "",
    duration: "",
    date: "",
    sets: "", // 👈 you already have sets here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "workoutType") {
      setFormData((prev) => ({
        ...prev,
        workout: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const workoutData = {
        ...formData,
        date: new Date(formData.date).getTime(),
      };

      await addWorkout(workoutData, token);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Failed to add workout:", err);
    }
  };

  return (
      <main>
        <h2>Add a New Workout</h2>
        <form onSubmit={handleSubmit}>
          {/* Workout Type select */}
          <div>
            <label>Workout Type:</label>
            <select
                name="workoutType"
                value={formData.workoutType}
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
                value={formData.workout}
                onChange={handleChange}
                required
                disabled={!formData.workoutType}
            >
              <option value="">-- Select a Workout --</option>
              {formData.workoutType &&
                  workoutOptions[formData.workoutType].map((workout) => (
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
                value={formData.sets}
                onChange={handleChange}
                required
                min="1"
                max="20"
            />
          </div>

          {/* Duration input */}
          <div>
            <label>Duration (minutes):</label>
            <input
                type="number"
                name="duration"
                value={formData.duration}
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
                value={formData.date}
                onChange={handleChange}
                required
            />
          </div>

          <button type="submit">Add Workout</button>
        </form>
      </main>
  );
};

export default AddWorkoutForm;
