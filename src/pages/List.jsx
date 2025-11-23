import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import Pagination from "../components/Pagination";
import useGetApi from "../hooks/useGetApi";
import { ProductListShimmer } from "../components/Shimmer";
import ErrorPage from "../components/ErrorPage";
import MiniHeader from "../components/MiniHeader";

import { SearchContext } from "../Context/SearchContext";
import HistorySidebar from "../components/HistorySidebar";

import ProductList from "../components/ProductList";

const List = ({ token }) => {
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [editingId, setEditingId] = useState(null);
  const { search, filterCategory } = useContext(SearchContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [open, setOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    unit: "",
    category: "",
    brand: "",
    stock: "",
    status: "",
  });

  const url =
    backendUrl +
    `/api/product?page=${currentPage}&limit=10&search=${search}&category=${filterCategory}`;

  console.log("token => from frontend => ", token);

  const {
    loading,
    error,
    data: apiData,
    retry,
  } = useGetApi(url, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ this is the correct format
    },
  });

  console.log("RAW TOKEN FROM FRONTEND ->", JSON.stringify(token));

  const list = apiData?.data || [];

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const cancelInline = (e) => {
    e.stopPropagation();
    setEditingId(null);
    setEditForm({});
  };

  const startInlineEdit = (e, item) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      unit: item.unit,
      category: item.category,
      brand: item.brand,
      stock: item.stock,
      status: item.status || "In Stock",
    });
  };

  const handleSelectOnChange = (value, type) => {
    switch (type) {
      case "category":
        setEditForm((prev) => ({
          ...prev,
          category: value,
        }));
        break;
      case "unit":
        setEditForm((prev) => ({
          ...prev,
          unit: value,
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (apiData.pagination) {
      setTotalPages(apiData.pagination.totalPages);
    }
  }, [apiData]);

  const renderUi = () => {
    if (loading) {
      return <ProductListShimmer />;
    } else if (error.isError) {
      return <ErrorPage retry={retry} />;
    } else {
      return (
        <div className="flex flex-col divide-y">
          {list.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No products found.</p>
          ) : (
            <ProductList
              props={{
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
              }}
            />
          )}
        </div>
      );
    }
  };

  return (
    <>
      {open && (
        <HistorySidebar selectedProduct={selectedProduct} setOpen={setOpen} />
      )}
      {open && (
        <div
          className="fixed top-0 right-0 left-0 bottom-0 z-[5]"
          onClick={() => setOpen(false)}
        ></div>
      )}
      <MiniHeader refetch={retry} />

      <p className="mb-2">All Product List</p>
      {/* ----------------List Table Title---------------- */}
      <div className="mt-4">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-gray-100 py-3 px-4 rounded-t-lg font-semibold text-gray-600">
          <p>Image</p>
          <p>Name</p>
          <p>unit</p>
          <p>Category</p>
          <p>Brand</p>
          <p>Stock</p>
          <p className="">Status</p>
          <p className="text-center">Action</p>
        </div>
      </div>
      {renderUi()}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default List;
