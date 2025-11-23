import React from "react";

export const ProductListShimmer = () => {
  return (
    <div className="w-full mt-3">
      <div className="bg-gray-100 transition-all duration-100 animate-pulse mb-3 w-full h-[40vh] md:h-[15vh] flex flex-col md:flex-row justify-between items-center px-4 py-2">
        <div className="h-16 w-16 rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
      </div>
      <div className="bg-gray-100 transition-all duration-100 animate-pulse mb-3 w-full h-[40vh] md:h-[15vh] flex flex-col md:flex-row justify-between items-center px-4 py-2">
        <div className="h-16 w-16 rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
      </div>
      <div className="bg-gray-100 transition-all duration-100 animate-pulse mb-3 w-full h-[40vh] md:h-[15vh] md:flex md:flex-row md:justify-between md:items-center px-4 py-2 hidden">
        <div className="h-16 w-16 rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
      </div>
      <div className="bg-gray-100 transition-all duration-100 animate-pulse mb-3 w-full h-[40vh] md:h-[15vh] md:flex  md:flex-row md:justify-between md:items-center px-4 py-2 hidden">
        <div className="h-16 w-16 rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-full md:w-[25%] rounded-md bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};
