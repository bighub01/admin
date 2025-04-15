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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách đơn hàng</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="p-2 border rounded hover:bg-gray-100">
            <Link to={`/order-detail/${order.orderCode}`}>
              Mã đơn: {order.orderCode} - Tổng phí: {order.totalFee} ₫
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
