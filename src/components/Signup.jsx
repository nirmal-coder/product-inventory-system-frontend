import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { replace, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Signup = ({ setToken }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

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

            setCurrentState("Login");
          } else {
            toast.error(response.data.message);
          }
        }
      } else {
        if (!emailId.trim() || !password.trim()) {
          toast.warning("All Fields are required!");
          return;
        } else {
          const response = await axios.post(backendUrl + "/api/login", {
            email: emailId,
            password,
          });
          if (response.data.success) {
            toast.success(response.data.message);
            Cookies.set("token", response.data.token);
            console.log(response.data.token);
            setToken(response.data.token);
            navigate("/", replace);
          } else {
            toast.error(response.data.message);
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong!");
      console.log(error);
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
            placeholder="nirmal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="nirmal@gmail.com or yours"
          required
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="nirmal@123 or yours"
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
