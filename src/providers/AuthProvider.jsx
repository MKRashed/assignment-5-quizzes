import localforage from "localforage";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../context";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const fetchAuthToken = async () => {

      const token = await localforage.getItem("authToken");

      const refreshToken = await localforage.getItem("refreshToken");
      
      const user = await localforage.getItem("user");

      if (token) {
        setAuth({ authToken: token, refreshToken, user });
      }
    };
    fetchAuthToken();
  }, []); 

  

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
