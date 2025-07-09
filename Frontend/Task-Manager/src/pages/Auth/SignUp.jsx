import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/input/Input";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
  isAdminTokenValid,
} from "../../utils/helper";
import { axiosInstancesOfForm } from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPath";

function SignUp() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgRef, setImgRef] = useState("");
  const [adminCode, setAdministrativeToken] = useState("");
  const [error, setError] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!isNameValid(name)) {
      setError("The name should not contain any symbols.");
    }
    if (!isEmailValid(email)) {
      setError("Please enter a valid email");
    }
    if (!isPasswordValid(password)) {
      setError(
        "Password must be at least 8 characters and include a number and an uppercase letter."
      );
    }
    if (!isAdminTokenValid(adminCode)) {
      setError(
        "Admin Token must be at least 8 digits and include only numbers."
      );
    }
    try {
      const formData = new FormData();
      console.log(profileImage)
      formData.append("name",name);
      formData.append("email",email);
      formData.append("profileImage",profileImage);
      formData.append("password",password);
      formData.append("adminCode",adminCode);

      const response = await axiosInstancesOfForm.post(API_PATHS.AUTH.REGISTER,formData);
      console.log(response.data);
      const role  = response.data.data.role;
      console.log(role)
      if (role == "admin") {
        navigate("/admin/dashboard");
      } else if(role == "user"){
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log("Error while sending data from SingUp Page", error);
    }
  };

  useEffect(() => {
    setError(" ");
  }, [name, email, password, adminCode]);

  const handelProfileImage = (e) => {
    try {
      const img = e.target.files[0];
      if (img) {
      setProfileImage(img);
      setImgRef(URL.createObjectURL(img));
      }
    } catch (error) {
      console.log("Error file is not supported",error)
    }
  };
  return (
    <AuthLayout>
      <div className="lg:h-[70%] sm:mb-[99px]  md:h-full h-full flex flex-col justify-center  ">
        <h1 className="text-xl font-semibold text-black mt-2 mb-2">SingUp</h1>
        <p className="text-sm font-semibold text-slate-700 mt-2 mb-2">
          Please enter your details to register
        </p>
        <form onSubmit={handelSubmit} className="">
          <div className="md:w-[80%] flex justify-center items-center ">
            {/* using image ref */}
            <div
              className="border-indigo-500 border-2 h-18 w-18 rounded-full bg-center bg-cover flex items-end justify-end"
              style={{ backgroundImage: `url(${imgRef})`}}
            >
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handelProfileImage}
                id="uploadPicture"
              />
              <label htmlFor="uploadPicture">
                {<FaCloudUploadAlt className="text-indigo-500" size={25} />}
              </label>
            </div>
          </div>
          {/* separated all the fields of sing up in to pairs */}
          <div className="w-[100%] flex flex-col items-center pl-6 md:pl-0 md:w-[90%] md:flex-row md:justify-start">
            <div className="w-[100%] md:w-[50%]">
              <Input
                value={name}
                onChange={({ target }) => setName(target.value)}
                label="Name"
                placeHolder="Name"
                type="text"
              />
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="email"
                placeHolder="Email"
                type="email"
              />
            </div>
            <div className="w-[100%] md:w-[50%]">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeHolder="Min 8 Character"
                type="password"
              />
              <Input
                value={adminCode}
                onChange={({ target }) => setAdministrativeToken(target.value)}
                label="Admin Token"
                placeHolder="Admin Token"
                type="password"
              />
            </div>
          </div>
          {error && (
            <p className="text-wrap md:text-sm pb-2 text-red-700">{error}</p>
          )}
          <button
            type="submit"
            className="w-[83%] sm:w-[87%] ml-6 md:ml-0 md:w-[81%] h-[40px] rounded-sm text-lg flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white font-semibold"
            onClick={handelSubmit}
          >
            Sing up
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
