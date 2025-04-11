import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderInfo } from "../../api/order/order";

const OrderInfoComponent = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const { data, loading, error } = useSelector((state) => state.order);

  const handleFetch = () => {
    dispatch(orderInfo(code));
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-green-200 to-blue-300 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Thông Tin Đơn Hàng</h2>

      <div className="flex items-center mb-6">
        <input
          type="text"
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã đơn hàng"
        />
        <button
          onClick={handleFetch}
          className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Lấy thông tin
        </button>
      </div>

      {loading && <p className="text-blue-500 text-center">Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {data && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Chi tiết đơn hàng</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OrderInfoComponent;
