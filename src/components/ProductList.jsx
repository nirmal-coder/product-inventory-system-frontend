import React from "react";
import { categories, categoryUnits } from "../assets/assets";
import useProductActions from "../hooks/useProductActions";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import DropDown from "./DropDown";

const ProductList = ({ props }) => {
  const {
    list,
    handleRowClick,
    editForm,
    editingId,
    handleSelectOnChange,
    setEditForm,
    retry,
    startInlineEdit,
    setEditingId,
    cancelInline,
  } = props;
  const { removeProduct, saveInline } = useProductActions(retry);
  return (
    <>
      {list.map((item) => (
        <div
          key={item.id}
          onClick={() => handleRowClick(item)}
          className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-3 p-4 hover:bg-gray-50 transition rounded-lg cursor-pointer text-center md:text-left"
        >
          {/* ✅ Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={item.imageUrl || "/placeholder.png"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md border"
            />
          </div>

          {/* ✅ Product Details */}
          <div className="text-gray-800 text-center md:text-left">
            {/* <p className="font-medium">{item.name}</p> */}

            {/*----------------------- Name----------------------- */}
            {editingId === item.id ? (
              <input
                className="border p-1 rounded w-full"
                value={editForm.name}
                onChange={(e) => {
                  setEditForm({ ...editForm, name: e.target.value });
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <p className="font-medium">{item.name}</p>
            )}
          </div>
          {/* ---------------------Category--------------------- */}
          {editingId === item.id ? (
            <div>
              <DropDown
                data={categories.slice(1, categories.length)}
                dropDownType={"category"}
                onChangeHandler={handleSelectOnChange}
                value={editForm.category}
              />
            </div>
          ) : (
            <p className="text-gray-700">{item.category}</p>
          )}

          {/* ✅ Category (hidden on mobile) */}
          {/* --------------------Unit-------------------- */}
          {editingId === item.id ? (
            <div>
              <DropDown
                data={categoryUnits[item.category]}
                dropDownType={"unit"}
                onChangeHandler={handleSelectOnChange}
                value={editForm.unit}
              />
            </div>
          ) : (
            <p className="text-gray-700">
              <span className="md:hidden font-medium text-gray-700">
                Unit :{" "}
              </span>
              {item.unit}
            </p>
          )}

          {/* ------------------Brand------------------ */}

          {editingId === item.id ? (
            <input
              className="border p-1 rounded w-full"
              value={editForm.brand}
              onChange={(e) =>
                setEditForm({ ...editForm, brand: e.target.value })
              }
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className=" text-gray-700">
              <span className="md:hidden font-medium text-gray-700">
                Brand :{" "}
              </span>
              {item.brand}
            </p>
          )}

          {/* ------------------------Stock------------------------ */}

          {editingId === item.id ? (
            <input
              className="border p-1 rounded w-full"
              value={editForm.stock}
              type="number"
              onChange={(e) =>
                setEditForm({ ...editForm, stock: e.target.value })
              }
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className=" text-gray-800">
              <span className="md:hidden font-medium text-gray-700">
                Stock :{" "}
              </span>
              {item.stock}
            </p>
          )}

          <p
            className={`${
              item.stock > 0 ? "text-green-700" : "text-red-700"
            } text-gray-800`}
          >
            <span className="md:hidden font-medium text-gray-700">
              Status :{" "}
            </span>
            {item.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* ✅ Delete */}
          <div className="hidden md:flex md:justify-center gap-x-4">
            {editingId === item.id ? (
              <div className="flex gap-3 justify-center">
                <button
                  className="text-green-600 hover:text-green-800 font-semibold"
                  onClick={(e) => saveInline(e, item, editForm, setEditingId)}
                >
                  Save
                </button>

                <button
                  className="text-gray-500 hover:text-gray-700 font-semibold"
                  onClick={cancelInline}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  title="Edit Product"
                  onClick={(e) => startInlineEdit(e, item)}
                >
                  <FaRegEdit className="text-2xl" />
                </button>
                <button
                  onClick={(e) => removeProduct(e, item.id, item.name)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Product"
                >
                  <MdDeleteOutline className="text-2xl" />
                </button>
              </>
            )}
          </div>

          {/* --------------For mobile screens-------------- */}

          <div className="md:hidden w-full flex items-center justify-between gap-x-3">
            {editingId === item.id ? (
              <div className="w-full flex gap-3 justify-end">
                <button
                  className="text-green-600 hover:text-green-800 font-semibold"
                  onClick={(e) => saveInline(e, item, editForm, setEditingId)}
                >
                  Save
                </button>

                <button
                  className="text-gray-500 hover:text-gray-700 font-semibold"
                  onClick={cancelInline}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <button
                    className="flex gap-x-1 py-2 px-6 text-sm border border-gray-700 transition-all duration-100 hover:text-white hover:bg-gray-900"
                    title="Edit Product"
                    onClick={(e) => startInlineEdit(e, item)}
                  >
                    <FaRegEdit className="text-lg" /> Edit
                  </button>
                </div>

                {/* ✅ Delete */}
                <div className="flex justify-center">
                  <button
                    onClick={(e) => removeProduct(e, item.id, item.name)}
                    className="flex gap-x-1 py-2 px-6 text-sm border border-red-700 text-red-700 transition-all duration-100 hover:text-white hover:bg-red-700"
                    title="Delete Product"
                  >
                    <MdDeleteOutline className="text-xl" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
