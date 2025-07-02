import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-screen h-screen flex flex-col justify-center gap-[100px] md:flex md:justify-center md:w-[60vw] px-12 pt-12 pb-12  lg:pt-24 ">
        <h1 className="text-xl font-bold text-indigo-500">TaskManger</h1>
        {children}
      </div>
      <div className="hidden pt-22 lg:pb-6 lg:pt-0 lg:items-center md:flex w-[40vw] h-screen items-center ">
        <img className="object-cover"
          src="https://res.cloudinary.com/dabcrcxpu/image/upload/v1750912261/209089066_10920011_k61dtw.jpg"
          alt="error 404 image not found"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
