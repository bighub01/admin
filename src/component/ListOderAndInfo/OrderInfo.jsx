import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const GHN_API = "https://nhom11t4sangca1dotnet.onrender.com/api/GHN";

const OrderDetailPage = () => {
  const { orderCode } = useParams();
  const [detail, setDetail] = useState(null);
  console.log(detail)
  useEffect(() => {
    if (orderCode) {
      axios
        .post(`${GHN_API}/order-info`, { orderCode })
        .then((res) => {
          if (res.data && res.data.data) {
            setDetail(res.data.data);
          }
        })
        .catch((err) => console.error("Lỗi gọi API chi tiết:", err));
    }
  }, [orderCode]);

  if (!detail) return <p className="p-4">Đang tải chi tiết đơn hàng...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg border border-blue-200">
     <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
      📦Mã đơn :{ orderCode }
    </h2>
      {/* Header border */}
      <div className="border-t-4 border-dashed border-blue-400 mb-4"></div>

      {/* Người gửi + Lựa chọn hình thức giao */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2 text-gray-800">Bên gửi</h2>
          <p className="text-red-600 font-semibold">
            {detail.from_name} <span className="ml-2">📞 {detail.from_phone}</span>
          </p>
          <p className="text-gray-700">{detail.return_address}</p>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input type="radio" checked readOnly />
              <span>Lấy hàng tận nơi</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" disabled />
              <span className="text-gray-400">Gửi hàng tại bưu cục</span>
            </label>
          </div>

          <h1 className="border rounded px-3 py-2 w-full mt-2">
            <Link to="/OrderList">trở về danh sách</Link>
          </h1>
        </div>
      </div>

      {/* Bên nhận */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Bên nhận</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block font-medium mb-1">Họ tên *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={detail.to_name}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Số điện thoại *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={detail.to_phone}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Địa chỉ *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={detail.to_address}
              readOnly
            />
          </div>
        
          <div>
            <label className="block font-medium mb-1">Tên hàng hóa</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={`Quận ${detail.content} - Hồ Chí Minh`}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Quận - Huyện *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={`Quận ${detail.to_district_id} - Hồ Chí Minh`}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phường - Xã *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={`Phường ${detail.to_ward_code}`}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
