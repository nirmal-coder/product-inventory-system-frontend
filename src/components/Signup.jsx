import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { replace, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Signup = ({ setToken }) => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let toastId = toast.loading("loading...");

    try {
      if (currentState === "Sign up") {
        if (!username.trim() || !emailId.trim() || !password.trim()) {
          toast.warning("All Fields are required!");
          return;
        } else {
          const response = await axios.post(backendUrl + "/api/signup", {
            email: emailId,
            password,
            name: username,
          });
          if (response.data.success) {
            toast.success(response.data.message);
            toast.update(toastId, {
              render: response.data.message,
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });

            setCurrentState("Login");
          } else {
            toast.update(toastId, {
              render: response.data.message,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
          }
        }
      } else {
        if (!emailId.trim() || !password.trim()) {
          toast.update(toastId, {
            render: "All Fields are required!",
            type: "warning",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        } else {
          const response = await axios.post(backendUrl + "/api/login", {
            email: emailId,
            password,
          });
          if (response.data.success) {
            toast.update(toastId, {
              render: response.data.message,
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
            Cookies.set("token", response.data.token, { expires: 7 });
            console.log(response.data.token);
            setToken(response.data.token);
            navigate("/", replace);
          } else {
            toast.update(toastId, {
              render: response.data.message,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: error?.response?.data?.message || "something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 mt-14 gap-4 text-gray-800 md:border-2 md:p-6"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          {/* <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" /> */}
          <img src={assets.logo} alt="" />
        </div>

        {currentState === "Sign up" && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder={`${
            currentState === "Sign up"
              ? "Email"
              : "nirmal@gmail.com or your Email Id"
          }`}
          required
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder={`${
            currentState === "Sign up"
              ? "Password"
              : "nirmal@123 or your password"
          }`}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex justify-end text-sm mt-[-8px]">
          {currentState === "Sign up" ? (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Sign up")}
              className="cursor-pointer"
            >
              Create account
            </p>
          )}
        </div>

        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
