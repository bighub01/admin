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
    <div className="p-4">
      <input
        type="text"
        className="border px-2 py-1"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Nhập orderCode"
      />
      <button onClick={handleFetch} className="ml-2 bg-blue-500 text-white px-4 py-1 rounded">
        Lấy thông tin
      </button>

      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="mt-4">
          <h2 className="font-bold">Thông tin đơn hàng:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OrderInfoComponent;
