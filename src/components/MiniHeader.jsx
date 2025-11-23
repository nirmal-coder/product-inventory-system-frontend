import React, { useContext, useRef } from "react";
import { CiImport, CiExport } from "react-icons/ci";
import DropDown from "./DropDown";
import { categories } from "../assets/assets";
import { SearchContext } from "../Context/SearchContext";
import axios from "axios";
import { toast } from "react-toastify";

const MiniHeader = ({ refetch }) => {
  const { search, setSearch, handleCategoryFilter, filterCategory } =
    useContext(SearchContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleExport = () => {
    window.open(backendUrl + `/api/products/export`);
  };

  const fileInputRef = useRef();

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    let toastId = toast.loading("uploading...");

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      backendUrl + "/api/products/import",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log(response.data);
    if (response.data.success) {
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      await refetch();
    } else {
      toast.update(toastId, {
        render: response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleClearFilter = () => {
    setSearch("");
    handleCategoryFilter("");
  };

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-x-6 mb-6">
        <div className="w-full">
          <input
            type="search"
            name=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-2 rounded border"
            placeholder="search by product name"
          />
        </div>

        <div className="w-full flex justify-between items-center my-4 lg:my-0">
          <div className="w-[40%] lg:w-[35%]">
            <DropDown
              dropDownType={"category"}
              data={categories}
              onChangeHandler={handleCategoryFilter}
              value={filterCategory}
              isMiniHeader={true}
            />
          </div>

          <div className="flex items-center gap-x-6">
            <button
              className="text-3xl bg-gray-100 p-2 rounded-[50%]  lg:border-2 lg:flex lg:text-sm lg:items-center lg:gap-x-3 lg:rounded"
              title="Import"
              onClick={handleImportClick}
            >
              <CiImport className="lg:text-[20px]" />{" "}
              <span className="hidden lg:block">Import</span>
            </button>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              className="text-3xl bg-gray-100 p-2 rounded-[50%] lg:bg-gray-600 lg:text-white  lg:border-2 lg:flex lg:text-sm lg:items-center lg:gap-x-3 lg:rounded "
              title="Export"
              onClick={handleExport}
            >
              <CiExport className="lg:text-[20px]" />{" "}
              <span className="hidden lg:block">Export</span>
            </button>
          </div>
        </div>
      </div>
      <div className="text-right text-blue-700">
        <button onClick={handleClearFilter}>Clear filter</button>
      </div>
    </>
  );
};

export default MiniHeader;
