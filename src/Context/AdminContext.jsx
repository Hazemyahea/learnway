import { createContext, useContext, useEffect, useState } from "react";
import { useGetUserProfile } from "../config/Queryes";
import AuthContext, { AuthProvider } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();
const AdminProvider = ({ children }) => {
  const navigate = useNavigate();

  const [ChoosenCourse, setChoosenCourse] = useState([]);
  const [ChoosenVideo, setChoosenVideo] = useState([]);

  const value = {
    ChoosenCourse,
    setChoosenCourse,
    ChoosenVideo,
    setChoosenVideo,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
