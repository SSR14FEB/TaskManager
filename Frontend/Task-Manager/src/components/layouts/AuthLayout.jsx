import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="flex items-center">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-12 pb-12 ">
        <h1 className="text-xl font-bold">TaskManger</h1>
        {children}
      </div>
      <div className="hidden md:flex w-[40vw] h-screen items-center  ">
        <img className="object-cove"
          src="https://res.cloudinary.com/dabcrcxpu/image/upload/v1750912261/209089066_10920011_k61dtw.jpg"
          alt="error 404 image not found"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
