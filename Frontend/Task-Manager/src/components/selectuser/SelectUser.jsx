import { useState, useEffect, useRef } from "react";
import { axiosInstances } from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPath";
import { LuChevronDown, LuUser } from "react-icons/lu";
import { Model } from "../layouts/Model";
import AvatarGroup from "../avatargroup/AvatarGroup";
function SelectUser({ selectedUsers, setSelectedUsers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const checkBoxRef = useRef([]);
  
  const getAllUsers = async () => {
    try {
      const response = await axiosInstances.get(API_PATHS.USER.GET_ALL_USER);
      if (response) {
        setAllUsers(response?.data.data);
      }
    } catch (error) {
      console.log("error 404 users not found", error.response?.data);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers(
      (prev) => (
        prev,
        prev.includes(userId)
          ? prev.filter((id) => id != userId)
          : [...prev, userId]
      )
    );
  };

  const handelAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModelOpen(false);
  };

  const handelCancel=()=>{
    setTempSelectedUsers(selectedUsers)
    setIsModelOpen(false)
  }

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._Id))
    .map((user) => user?.profileImage||"");

  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);

  useEffect(() => {
    if (selectedUsers.length == 0) {
      setTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);

  return (
    <div className="mt-2 space-y-4">
      {selectedUserAvatars.length == 0 && (
        <button
          className="flex items-center cursor-pointer  gap-4 text-sm font-medium text-slate-600 px-2.5 py-3 border border-slate-200 rounded-md "
          onClick={() => setIsModelOpen(true)}
        >
          <LuUser className="" /> Add Members
        </button>
      )}
      {selectedUserAvatars.length>0&&(
        <div className="cursor-pointer" onClick={()=>setIsModelOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3}/>
        </div>
      )}
      <Model
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((users,index) => (
            <div key={users._Id} className="flex items-center gap-4 p-3 border-b border-gray-200">
              <img
                src={users?.profileImage}
                className=" h-10 w-10 rounded-full "
              />
              <div className=" flex-1 ">
                <p className="font-medium text-gray-800">{users.name}</p>
                <p className="text-[13px] text-gray-500">{users.email}</p>
              </div>
              <input
                type="checkbox"
                ref={(el) => (checkBoxRef.current[index] = el)}
                className="appearance-auto w-4 h-4 accent-indigo-500 bg-gray-100 border-gray-300 rounded-sm outline-none"
                checked={tempSelectedUsers.includes(users._Id)}
                onChange={() => toggleUserSelection(users._Id)}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button className="text-sm font-medium text-gray-700 hover:text-rose-600 px-2 py-2" onClick={handelCancel}>
            CANCEL
          </button>
          <button className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-2 py-2 " onClick={handelAssign}>
            DONE
          </button>
        </div>
      </Model>
    </div>
  );
}

export { SelectUser };
