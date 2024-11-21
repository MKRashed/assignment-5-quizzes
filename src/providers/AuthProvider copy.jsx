import { useEffect, useState } from "react";

import localforage from "localforage";
import { AuthContext } from "../context";

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    useEffect(() => {
        const checkAuth = async () => {
          const storedAccessToken = await localforage.getItem("authToken");
          const refreshToken = await localforage.getItem("refreshToken");
          const storedUser = await localforage.getItem("user");
          if (storedAccessToken && storedUser) {
            setAuth({
              authToken: storedAccessToken,
              refreshToken: refreshToken, 
              user: storedUser,
            });
          }
        };
    
        checkAuth();
      }, []);

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;