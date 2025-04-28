import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/authService.js";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      navigate("/profile");  // ✅ after sign up, user fills out profile
    } catch (err) {
      console.error("Sign Up error:", err);
      setError(err.message);
    }
  };

  return (
      <main>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* Your form fields */}
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="confirm">Confirm Password:</label>
            <input type="password" id="confirm" name="passwordConf" value={formData.passwordConf} onChange={handleChange} required />
          </div>

          <button type="submit">Submit</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
      </main>
  );
}
