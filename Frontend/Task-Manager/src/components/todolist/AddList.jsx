import uniqid from "uniqid";
import React, { useState } from "react";

function AddList({ value, placeholder, onClick, icon }) {
  const [input, setInputValue] = useState({
    id: "0",
    text: "",
  });
  const handelAdd = () => {
    if (input.text.trim() != "") {
      onClick(input);
    }
    setInputValue((prev) => ({ ...prev, text: "" }));
  };
  return (
    <div className="flex justify-center gap-5 items-center ">
      <input
        className="w-full text-[13px] text-black outline-none bg-white border border-slate-200 px-2.5 py-3 rounded-md placeholder:text-gray-500"
        value={input.text}
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue((prev) => ({
            ...prev,
            text: e.target.value,
            id: uniqid(),
          }));
        }}
      />
      <div
        className="flex gap-1 px-2.5 py-3 text-[13px] bg-indigo-600 text-neutral-100 hover:bg-indigo-500 h-full rounded-md"
        onClick={handelAdd}
      >
        Add {icon}
      </div>
    </div>
  );
}

export default AddList;
