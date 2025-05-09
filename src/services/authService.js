const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/users`;
console.log(BASE_URL)

export const signUp = async (formData) => {
  try {
  
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log(res)

    const data = await res.json();
    console.log("Data: ", data);

    if (!res.ok) {
        throw new Error(data.err || "An error occurred during signup");
    }
    

    if (!data.token) {
      throw new Error("Invalid response from server");
    }

    localStorage.setItem("token", data.token);
    return JSON.parse(atob(data.token.split(".")[1])).payload;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (!data.token) {
      throw new Error("Invalid response from server");
    }

    localStorage.setItem("token", data.token);
    return JSON.parse(atob(data.token.split(".")[1])).payload;
  } catch (err) {
    console.log(err);
    throw new Error(err.message || "An unknown error occurred during signup");
  }
};