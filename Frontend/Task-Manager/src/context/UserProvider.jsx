import { useEffect, useState } from "react";
import { axiosInstances } from "../utils/axiosInstances";
import { API_PATHS } from "../utils/apiPath";
import { UserContext } from "./CreateContext";
import { memo } from "react";

 const UserProvider = ({ children }) => {
  console.log("Provider")
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstances.get(API_PATHS.AUTH.PROFILE);
        setUser(response);
      } catch (error) {
        console.log(
          "Error 500 something went wrong while fetching user data",
          error
        );
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

  return (
    <UserContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default memo(UserProvider);
