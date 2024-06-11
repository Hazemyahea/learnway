import React, { useContext } from "react";
import AdminNav from "../compontents/Admin/AdminNav";
import { Outlet } from "react-router-dom";
import AdminProvider from "../Context/AdminContext";
import AuthContext, { AuthProvider } from "../Context/AuthContext";

const AdminPanel = () => {
  const { Admin } = useContext(AuthContext);
  if (Admin == false) {
    return <p>غير مصرح لك</p>;
  }
  return (
    <div className="flex flex-col md:flex-row gap-10 container mx-auto py-10">
      <AdminProvider>
        <AdminNav />
        <Outlet />
      </AdminProvider>
    </div>
  );
};

export default AdminPanel;
