import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute({ allowedRoles }) {
  const usersRole = {
    admin: () => {
      console.log("i am in admin outlet");
      <Outlet />;
    },
    user: () => {
      console.log("i am in user outlet");
      <Outlet />;
    },
  };
  return usersRole[allowedRoles]();
}

export default PrivateRoute;
