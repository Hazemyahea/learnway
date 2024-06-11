import { createContext, useEffect, useState } from "react";
import { useGetUser, useSignOut } from "../config/Queryes";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const { data, isLoading, error, refetch } = useGetUser();
  const { mutate: signOut, isSuccess } = useSignOut();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [Admin, SetAdmin] = useState(false);

  function signOutHandler() {
    signOut();
    setIsAuthenticated(false);
    setUser(null);
  }
  function signInHandler() {
    setIsAuthenticated(true);
    refetch();
  }
  useEffect(() => {
    if (data) {
      setUser(data);
      setIsAuthenticated(true);
      if (data.id == "756725f8-4d22-4c26-a70a-5feb90b7d3ce") {
        SetAdmin(true);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [data]);

  const value = {
    user,
    isAuthenticated,
    signOutHandler,
    signInHandler,
    Admin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
