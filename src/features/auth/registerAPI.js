import axios from "../../hooks/useAxios";

export const register = (userDetails) => async () => {
    try {

      await axios.post("/auth/register", userDetails);

      alert("Registration successful!");

    } catch (error) {

      console.error("Registration failed:", error);

    }
  };