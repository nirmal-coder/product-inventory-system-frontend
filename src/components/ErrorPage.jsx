import React from "react";

const ErrorPage = ({ retry }) => {
  return (
    <div className="flex flex-col items-center text-red-500 py-10">
      <p className="my-3">⚠️Failed to fetch products</p>
      <button
        onClick={retry}
        className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border border-black"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
