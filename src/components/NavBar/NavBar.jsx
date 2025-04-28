import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ fixed incorrect import
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">FitSync</Link>
          </div>
          <ul className="nav-links">
            {user ? (
                <>
                  <li className="welcome-text">Welcome, {user.username}</li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link> {/* ✅ New */}
                  </li>
                  <li>
                    <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
                  </li>
                </>
            ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/sign-up">Sign Up</Link></li>
                  <li><Link to="/sign-in">Sign In</Link></li>
                </>
            )}
          </ul>

        </div>
      </nav>
  );
}

export default NavBar;
