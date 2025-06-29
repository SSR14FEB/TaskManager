import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Input({ value, onChange, label, placeHolder, type }) {
  const [showPassword, setShowPassword] = useState(false);
  console.log(showPassword);
  const onToggle = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="">
      <label className="text-md text-slate-800">{label}</label>
      <div className="inputBox">
        <input
          className="outline-none w-full h-full bg-transparent placeholder-gray-500 placeholder"
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeHolder}
          onChange={(e) => onChange(e)} required
        ></input>
        {
          type =="password"?
        <>
        {showPassword? (
          <FaEye className="text-slate-600 cursor-pointer" size={25} onClick={onToggle} />
        ) : (
          <FaEyeSlash className="text-slate-600 cursor-pointer" size={25} onClick={onToggle} />
        )}
        </>:
        ""
      }
      </div>
    </div>
  );
}

export default Input;
