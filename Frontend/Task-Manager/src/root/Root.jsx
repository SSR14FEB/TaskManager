import { useContext } from "react";
import { Navigate } from "react-router-dom";
import  UserContext  from "../context/CreateContext";

export const Root = () => {
  const { user, loading } = useContext(UserContext);
  console.log("I am here in Root");
  console.log("user,loading",user,loading)
  if (loading) {
    return <div>Loading...</div>; // or return null;
  }

  if (!user) {
    console.log("No user, redirecting...");
    return <Navigate to="/login"/>;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard"/>
  ) : (
    <Navigate to="/user/dashboard"/>
  );
};
