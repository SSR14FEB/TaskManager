import React, { useContext, useState, useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import { axiosInstances } from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPath";
import UserContext from "../../context/CreateContext";
import { SIDE_MENU_ADMIN_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

function SideMenu({ activeMenu }) {
  const { user } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();
  const handelClick = (route) => {
    if (route == "/logout") {
      handelLogOut();
      return;
    } else {
      console.log(route)
      navigate(route);
    }
  };
  const handelLogOut = async () => {
    try {
      const response = await axiosInstances.post(API_PATHS.AUTH.LOGOUT);
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log(
        "error 500 something went wrong while proceeding logout ",
        error.response.data
      );
    }
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role == "admin" ? SIDE_MENU_ADMIN_DATA : SIDE_MENU_USER_DATA
      );
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)]  bg-white border-r border-gray-200/50 sticky top-[61px] z-20 ">
      <div className=" flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            className="w-20 h-20 bg-slate-400/50 rounded-full"
            src={user?.profileImageUrl}
            alt="Profile Image"
          />
        </div>
        {user?.role == "admin" && (
          <div className="text-[10px] font-medium text-white bg-indigo-600 rounded-sm px-3 py-0.7 mt-1">
            Admin
          </div>
        )}
        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>
      {sideMenuData.map((item, index) => {
        return (
          <button
            key={`menu,${index}`}
            className={`w-full flex items-center gap-5  text-[15px] ${
              activeMenu == item.label
                ? "text-indigo-600 bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3 border-indigo-600 "
                : ""
            }py-3 px-6 mb-5 cursor-pointer`}
            onClick={() => handelClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default SideMenu;
