import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWorkout } from "../../services/workoutService";
import "./AddWorkoutForm.css";
import workoutOptions from "../WorkoutOptions/WorkoutsOptions.jsx"



const AddWorkoutForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workoutType: "",
    workout: "",
    duration: "",
    date: "",
    sets: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "workoutType" && { workout: "" }), 
    }));
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

      console.error(" Failed to add workout:", err);
    }
  };

  return (
      <main>
        <h2>Add a New Workout</h2>
        <form onSubmit={handleSubmit}>

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
