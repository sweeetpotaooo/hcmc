import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const NotAuthRoutes = ({ isAuth }) => {
  return !isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default NotAuthRoutes;
