import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://nhom11t4sangca1.onrender.com";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

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
            {currentOrders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3">
                  {(currentPage - 1) * ordersPerPage + index + 1}
                </td>
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
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 italic">
                  Không có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            « Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Sau »
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
