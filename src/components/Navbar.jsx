import React from "react";
import { assets } from "../assets/assets";
import Cookies from "js-cookie";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img
        className="w-[max(10%,160px)] h-[60px] object-contain"
        src={assets.logo}
        alt=""
      />
      <button
        onClick={() => {
          setToken("");
          Cookies.remove("token");
        }}
        className="bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs "
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
