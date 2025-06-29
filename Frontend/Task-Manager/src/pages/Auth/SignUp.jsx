import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/input/Input";
import { FaCloudUploadAlt } from "react-icons/fa";

function SignUp() {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgRef, setImgRef] = useState("")
  const [administrativeToken, setAdministrativeToken] = useState("");
  const [error, setError] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
  };

  const handelProfilePicture =(e)=>{
    const img = e.target.files[0];
    setImgRef(URL.createObjectURL(img))
    console.log(imgRef)
  }
  return (
    <AuthLayout>
      <div className="lg:h-[70%] sm:mb-[99px]  md:h-full h-full flex flex-col justify-center">
        <h1 className="text-xl font-semibold text-black mt-2 mb-2">
          SingUp
        </h1>
        <p className="text-sm font-semibold text-slate-700 mt-2 mb-2">
          Please enter your details to register
        </p>
        <form onSubmit={handelSubmit} className="">
          <div className="md:w-[80%] flex justify-center items-center ">
              {/* using image ref */}
            <div className="border-indigo-500 border-2 h-18 w-18 rounded-full bg-center bg-cover flex items-end justify-end" style={{ backgroundImage:`url(${imgRef})`}}>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                value={profile}
                onChange={handelProfilePicture}
                id="uploadPicture"
              />
              <label htmlFor="uploadPicture">{<FaCloudUploadAlt className="text-indigo-500" size={25} />}</label>
            </div>
          </div>
          {/* separated all the fields of sing up in to pairs */}
          <div className="flex justify-start w-[90%] ">
            <div className="w-[50%]">
              <Input
                value={name}
                onChange={({ text }) => setName(text.value)}
                label="Name"
                placeHolder="Name"
                type="text"
              />
              <Input
                value={email}
                onChange={({ text }) => setEmail(text.value)}
                label="email"
                placeHolder="Email"
                type="email"
              />
            </div>
            <div className="w-[50%]">
              <Input
                value={password}
                onChange={({ text }) => setPassword(text.value)}
                label="Password"
                placeHolder="Min 8 Character"
                type="password"
              />
              <Input
                value={administrativeToken}
                onChange={({ text }) => setAdministrativeToken(text.value)}
                label="Admin Token"
                placeHolder="Admin Token"
                type="password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-[90%] md:w-[81%] h-[40px] rounded-sm text-lg flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white font-semibold"
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
