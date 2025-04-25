import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWorkout } from "../../services/workoutService"; 
import "./AddWorkoutForm.css";
const AddWorkoutForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workoutType: "",
    workout: "",
    duration: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      const workoutData = {
        ...formData,
        date: new Date(formData.date).getTime(), // ✅ convert to timestamp
      };
  
      await addWorkout(workoutData, token);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Failed to add workout:", err);
    }
  };
      //       await addWorkout(formData, token);         
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Failed to add workout:", err);
//     }
//   };

  return (
    <main>
      <h2>Add a New Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Workout Type:</label>
          <input
            type="text"
            name="workoutType"
            value={formData.workoutType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Workout:</label>
          <input
            type="text"
            name="workout"
            value={formData.workout}
            onChange={handleChange}
            required
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
