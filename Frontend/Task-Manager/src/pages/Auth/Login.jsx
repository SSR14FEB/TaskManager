import React, { useContext, useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPath";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/input/Input";
import { isEmailValid, isPasswordValid } from "../../utils/helper";
import Cookies from "js-cookie";
import { axiosInstances } from "../../utils/axiosInstances";
import UserContext from "../../context/CreateContext";

function Login() {
  const { updateUser } = useContext(UserContext);
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // this function is use to handel the form and field validation
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!isPasswordValid(password)) {
      setError(
        "Password must be at least 8 characters and include a number and an uppercase letter."
      );
    }
    // api call
    try {
      const response = await axiosInstances.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { data } = response.data;
      console.log(data);
      if (data) {
        updateUser(data);
      }
      if (data.role == "admin") {
        navigator("/admin/dashboard");
      } else {
        navigator("/user/dashboard");
      }
    } catch (error) {
      console.log(
        "error while sending request from frontend",
        error.response.data
      );
    }
  };
  useEffect(() => {
    setError("");
  }, [email, password]);
  console.log(email);
  return (
    <div className="flex justify-center items-center h-screen w-full pl-10 overflow-hidden">
      <AuthLayout>
        <div className="lg:h-[70%] sm:mb-[99px] md:h-full h-1/3 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">Welcome</h3>
          <p className="text-slate-700 text-sm mt-[5px] mb-6">
            Please enter your login details
          </p>
          <form onSubmit={handelSubmit}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email address"
              placeHolder="sonu@gmail.com"
              type="email"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeHolder="Min 8 Characters"
              type="password"
            />
            {/* validation error massage */}
            {error && <p className="text-sm pb-2 text-red-700">{error}</p>}

            <button
              type="submit"
              className="w-[90%] md:w-[80%] h-[40px] rounded-sm text-lg flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white font-semibold"
              onClick={handelSubmit}
            >
              Login
            </button>
            <div className=" text-sm w-full md:w-[90%] h-[30px] pt-3">
              <p>
                Don't have an account{" "}
                <Link
                  to="/signup"
                  className="text-indigo-700 underline hover:font-bold"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Login;
