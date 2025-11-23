import React, { useState } from "react";
import { assets, categories, categoryUnits } from "../assets/assets";
import DropDown from "../components/DropDown";
import axios from "axios";

import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");

  const [category, setCategory] = useState("fashion-apparel");
  const [unit, setUnit] = useState(categoryUnits[category][0]);
  const [stock, setStock] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !brand || !category || !unit || !stock || !image) {
      return toast.warning("All fields are required!");
    }
    let toastId;

    try {
      toastId = toast.loading("uploading....");
      const formData = new FormData();

      image && formData.append("image", image);
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("unit", unit);
      formData.append("stock", stock);

      console.log(backendUrl + "/api/product/add");

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ this is the correct format
          },
        }
      );

      console.log(response);
      if (response.data.success) {
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setName("");
        setBrand("");

        setStock("");
        setImage(null);
      } else {
        toast.error();
        toast.update(toastId, {
          render: response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render:
          error.response?.data?.message || error?.message || "somthing worng!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleSelectOnChange = (value, type) => {
    switch (type) {
      case "category":
        setCategory(value);
        break;
      case "unit":
        setUnit(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="w-full flex flex-col  items-start gap-3"
      >
        {/* -----------------------Image Upload Start----------------------- */}
        <div>
          <p className="mb-2">Upload Image</p>

          <div className="flex gap-2">
            <label htmlFor="image">
              <img
                className="w-20"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt=""
              />
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                type="file"
                id="image"
                hidden
              />
            </label>
          </div>
        </div>

        {/* ------------------------Image Upload end------------------------ */}

        <div className="w-full">
          <p className="mb-2"> Product Name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2
        "
            type="text"
            placeholder="Hp victus 15"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Brand</p>
          <input
            className="w-full max-w-[500px] px-3 py-2
        "
            type="text"
            placeholder="Hp"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></input>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-[768px] sm:gap-6">
          <div className="w-full max-w-[200px]">
            <p className="mb-2">Product category</p>
            <DropDown
              data={categories.slice(1, categories.length)}
              dropDownType={"category"}
              onChangeHandler={handleSelectOnChange}
              value={category}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <p className="mb-2">Unit</p>
            <DropDown
              data={categoryUnits[category]}
              onChangeHandler={handleSelectOnChange}
              dropDownType={"unit"}
            />
          </div>

          <div className="w-full max-w-[200px]">
            <p className="mb-2">Stock</p>
            <input
              className="w-full px-3 py-2"
              type="number"
              placeholder="25"
              id=""
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        <button className="py-3 px-6 mt-4 bg-black text-white">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
