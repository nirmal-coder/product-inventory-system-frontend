import React from "react";
import useGetApi from "../hooks/useGetApi";
import Cookies from "js-cookie";
const HistorySidebar = ({ selectedProduct, setOpen, open }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = Cookies.get("token");

  const { loading, data, error } = useGetApi(
    backendUrl + `/api/products/${selectedProduct.id}/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ this is the correct format
      },
    }
  );

  const history = data?.data || [];

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-xl p-5 transition-transform duration-300 z-10 ${
        open && "w-96"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">
        Inventory History – {selectedProduct?.name}
      </h2>

      <button className="absolute top-2 right-2" onClick={() => setOpen(false)}>
        ✕
      </button>

      {loading && <p>Loading...</p>}
      {error.isError && <p>{error.message}</p>}

      {history.length === 0 ? (
        <p className="text-gray-500">No history available</p>
      ) : (
        <div className="space-y-4">
          {history.map((log) => (
            <div key={log.id} className="p-3 border rounded-lg">
              <div>
                <b>Date:</b> {new Date(log.change_date).toLocaleString()}
              </div>
              <div>
                <b>Old Stock:</b> {log.old_quantity}
              </div>
              <div>
                <b>New Stock:</b> {log.new_quantity}
              </div>
              <div>
                <b>Changed By:</b> {log.user_info}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySidebar;
