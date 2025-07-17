import { useEffect, useState, } from "react";
import { axiosInstances } from "../utils/axiosInstances";
import { API_PATHS } from "../utils/apiPath";
import UserContext from "./CreateContext";
console.log("useProvider") 
const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("i am in use state")
    const fetchUser =async () => {
      try {
        const response = await axiosInstances.get(API_PATHS.AUTH.PROFILE);
        setUser(response.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    setLoading(false);
  };
  console.log(user)
  return (
    <UserContext.Provider value={{user,loading,updateUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
