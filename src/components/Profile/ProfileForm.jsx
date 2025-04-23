// import { useState } from "react";

// export default function ProfileForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "",
//     age: "",
//     weight: "",
//     height: "",
//     experience: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData); // send to backend or parent component
//   };

//   return (
//     <form onSubmit={handleSubmit} className="profile-form">
//       <label>Name:
//         <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//       </label>

//       <label>Gender:
//         <select name="gender" value={formData.gender} onChange={handleChange} required>
//           <option value="">Select</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Non-binary">Non-binary</option>
//           <option value="Prefer not to say">Prefer not to say</option>
//         </select>
//       </label>

//       <label>Age:
//         <select name="age" value={formData.age} onChange={handleChange} required>
//           <option value="">Select</option>
//           {Array.from({ length: 88 }, (_, i) => (
//             <option key={i} value={i + 13}>{i + 13}</option>
//           ))}
//         </select>
//       </label>

//       <label>Weight (lbs):
//         <select name="weight" value={formData.weight} onChange={handleChange} required>
//           <option value="">Select</option>
//           {Array.from({ length: 221 }, (_, i) => (
//             <option key={i} value={i + 80}>{i + 80}</option>
//           ))}
//         </select>
//       </label>

//       <label>Height (inches):
//         <select name="height" value={formData.height} onChange={handleChange} required>
//           <option value="">Select</option>
//           {Array.from({ length: 37 }, (_, i) => (
//             <option key={i} value={i + 48}>{i + 48}</option>
//           ))}
//         </select>
//       </label>

//       <label>Experience Level:
//         <select name="experience" value={formData.experience} onChange={handleChange} required>
//           <option value="">Select</option>
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Expert">Expert</option>
//         </select>
//       </label>

//       <button type="submit">Save Profile</button>
//     </form>
//   );
// }