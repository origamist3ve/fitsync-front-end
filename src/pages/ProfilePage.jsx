// import React from "react";
// import ProfileForm from "../components/Profile/ProfileForm.jsx";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ProfilePage() {
//   const navigate = useNavigate();

//   const handleProfileSubmit = async (formData) => {
//     try {
//       const response = await axios.post("/api/profile", formData);
//       console.log("Profile created:", response.data);
//       navigate("/dashboard"); // or wherever you want the user to go after saving
//     } catch (error) {
//       console.error("Failed to submit profile:", error);
//       alert("Something went wrong saving your profile. Try again!");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h1>Let’s Create Your FitSync Profile</h1>
//       <ProfileForm onSubmit={handleProfileSubmit} />
//     </div>
//   );
// }