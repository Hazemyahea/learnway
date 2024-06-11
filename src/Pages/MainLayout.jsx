import React from "react";
import { MainNav } from "../compontents/MainNav";
import { MainFooter } from "../compontents/MainFooter";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../Context/AuthContext";

const MainLayout = () => {
  return (
    <>
      <MainNav />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default MainLayout;
