import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetApi = (url, config = {}, initialData = []) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, config);
      if (response.data.success) {
        setData(response.data);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
        setError((prev) => ({
          ...prev,
          isError: true,
          message: response.data.message,
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || error.message);
      setError((prev) => ({
        ...prev,
        isError: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
    retry: fetchData,
  };
};

export default useGetApi;
