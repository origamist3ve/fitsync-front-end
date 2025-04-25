import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Show from "./components/Show/Show.jsx";
import DashboardPage from "./pages/DashboardPage";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import FeedPage from "./pages/FeedPage";
import AddWorkoutForm from "./components/AddWorkoutForm/AddWorkoutForm.jsx";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext.jsx";
import { Routes, Route } from "react-router";
import "./App.css";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/users/:id" element={<Show />} />
        <Route path="/dashboard" element={<DashboardPage user={user} />} />
        <Route path="/add-workout" element={<AddWorkoutPage />} />
        <Route path="/workout/new" element={<AddWorkoutForm />} />
        <Route path="/workouts/:workoutId/edit" element={<EditWorkoutPage />} />
        <Route path="/feed" element={<FeedPage user={user} />} />

      </Routes>
    </>
  );
}

export default App;
