import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddWorkoutPage() {
  const [form, setForm] = useState({
    date: "",
    type: "",
    duration: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert("Failed to add workout");
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Add New Workout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Type:
          <input type="text" name="type" value={form.type} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Duration (mins):
          <input type="number" name="duration" value={form.duration} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Save Workout</button>
      </form>
    </main>
  );
}
