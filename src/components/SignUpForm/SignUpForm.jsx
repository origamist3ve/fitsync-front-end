import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService.js";
import { UserContext } from "../../contexts/UserContext.jsx";

function SignUpForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

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

    // Clear error when typing
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.passwordConf) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const newUser = await signUp(formData);
      setUser(newUser); // ✅ setUser immediately after signup
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
      <main>
        <h1>Sign Up</h1>

        {/* Error Display */}
        {error && (
            <p style={{ color: "red", marginBottom: "1rem", fontWeight: "bold" }}>
              {error}
            </p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={formData.username}
                name="username"
                onChange={handleChange}
                required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
            />
          </div>

          <div>
            <label htmlFor="confirm">Confirm Password:</label>
            <input
                type="password"
                id="confirm"
                value={formData.passwordConf}
                name="passwordConf"
                onChange={handleChange}
                required
            />
          </div>

          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </main>
  );
}

export default SignUpForm;
