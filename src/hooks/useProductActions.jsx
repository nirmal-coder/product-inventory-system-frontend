import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const useProductActions = (retry) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = Cookies.get("token");

  const removeProduct = async (e, productId, name) => {
    e.stopPropagation();
    console.log("remove fun : ", productId);
    let toastId = toast.loading("Deleting : " + name);
    try {
      const response = await axios.delete(
        backendUrl + `/api/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ this is the correct format
          },
        }
      );

      if (response.data.success) {
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        await retry();
      } else {
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
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const saveInline = async (e, item, editForm, setEditingId) => {
    e.stopPropagation();
    let toastId = toast.loading("Updating...");
    try {
      const res = await axios.patch(
        backendUrl + `/api/product/${item.id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        toast.update(toastId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(toastId, {
          render: res.data.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }

      setEditingId(null);
      await retry(); // refresh list
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || "Update failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return { removeProduct, saveInline };
};

export default useProductActions;
