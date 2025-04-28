import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // 🆕 state for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      if (!signedInUser) {
        throw new Error("Invalid username or password");
      }

      setUser(signedInUser);
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign in failed:", err.message);
      setError("Invalid credentials. Please try again."); // 🔥 nice user-friendly error
    }
  };

  return (
      <main>
        <h1>Sign In</h1>

        {/* Error Message */}
        {error && (
            <p style={{ color: "red", marginBottom: "1rem", fontWeight: "bold" }}>
              {error}
            </p>
        )}

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                autoComplete="off"
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
                autoComplete="off"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </main>
  );
};

export default SignInForm;
