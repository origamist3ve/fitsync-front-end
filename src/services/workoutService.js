const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/workouts`;

export const addWorkout = async (workoutData, token) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(workoutData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add workout");
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to add workout:", err);
    throw err;
  }
};
