import axios from "axios";
import { loginSuccess } from "./authSlice";

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, credentials);

    dispatch(loginSuccess({
        accessToken: data.data.tokens.accessToken ,
        refreshToken: data.data.tokens.refreshToken,
        user: data.data.user,
      }));

  } catch (error) {

    console.error("Login failed:", error);

  }
};