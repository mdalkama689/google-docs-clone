import { createContext, useEffect, useState } from "react";

const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserDetailsFromLocalStorage =
      localStorage.getItem("userDetails");
    const fetchIsAuthenticatedFromLocalStorage =
      localStorage.getItem("isAuthenticated");
    setUserDetails(JSON.parse(fetchUserDetailsFromLocalStorage));
    setIsAuthenticated(JSON.parse(fetchIsAuthenticatedFromLocalStorage));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setUserDetails,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
