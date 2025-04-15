import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://nhom11t4sangca1.onrender.com";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/order/getAll`)
      .then((res) => setOrders(res.data.result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
      📦 Danh sách đơn hàng
    </h2>

    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-6 py-3 font-semibold">STT</th>
            <th className="px-6 py-3 font-semibold">Mã đơn hàng</th>
            <th className="px-6 py-3 font-semibold">Tổng phí</th>
            <th className="px-6 py-3 font-semibold">Chi tiết</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {orders.map((order, index) => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3 font-medium text-gray-800">
                {order.orderCode}
              </td>
              <td className="px-6 py-3 text-red-500 font-semibold">
                {order.totalFee.toLocaleString()} ₫
              </td>
              <td className="px-6 py-3">
                <Link
                  to={`/order-detail/${order.orderCode}`}
                  className="text-blue-600 hover:underline"
                >
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-4 text-center text-gray-500 italic"
              >
                Không có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default OrderList;
