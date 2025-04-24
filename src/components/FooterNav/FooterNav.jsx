import React from "react";
import { useNavigate } from "react-router-dom";

export default function FooterNav() {
  const navigate = useNavigate();

  return (
    <footer style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      borderTop: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-around",
      padding: "1rem"
    }}>
      <button onClick={() => navigate("/feed")}>Feed</button>
      <button onClick={() => navigate("/workout/new")}>➕ Add</button>
      <button onClick={() => navigate("/progress")}>Progress</button>
    </footer>
  );
}