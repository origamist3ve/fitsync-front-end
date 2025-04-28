// src/components/ProfileForm/ProfileForm.jsx
import React, { useState, useEffect } from "react";

export default function ProfileForm({ initialData = {}, onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        weight: "",
        height: "",
        experienceLevel: "Beginner",
    });

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                name: initialData.name || "",
                gender: initialData.gender || "",
                age: initialData.age || "",
                weight: initialData.weight || "",
                height: initialData.height || "",
                experienceLevel: initialData.experienceLevel || "Beginner",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Gender:</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="10"
                    max="100"
                    required
                />
            </div>

            <div>
                <label>Weight (lbs):</label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    min="50"
                    max="500"
                    required
                />
            </div>

            <div>
                <label>Height (inches):</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    min="36"
                    max="90"
                    required
                />
            </div>

            <div>
                <label>Experience Level:</label>
                <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            <button type="submit">Save Profile</button>
        </form>
    );
}
