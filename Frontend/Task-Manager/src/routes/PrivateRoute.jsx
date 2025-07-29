import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute({ allowedRoles }) {
  const usersRole = {
    admin: () => {
     return <Outlet />;
    },
    user: () => {
      return <Outlet />;
    },
  };
  return usersRole[allowedRoles]();
}

export default PrivateRoute;
