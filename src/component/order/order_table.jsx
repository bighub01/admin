import React from 'react';

const OrderTable = () => {
  // Dữ liệu mẫu
  const data = [
    {
      to_address: '123 Lý Thường Kiệt, Q.10',
      to_phone: '0912345678',
      status: 'Đang giao',
      order_date: '2025-04-07',
    },
    {
      to_address: '456 Nguyễn Huệ, Q.1',
      to_phone: '0909123456',
      status: 'Đã giao',
      order_date: '2025-04-06',
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-green-200 to-blue-300 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Danh Sách Đơn Hàng</h2>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-6 py-3 text-left font-medium text-gray-700">Địa chỉ giao</th>
              <th className="border px-6 py-3 text-left font-medium text-gray-700">Số điện thoại</th>
              <th className="border px-6 py-3 text-left font-medium text-gray-700">Trạng thái</th>
              <th className="border px-6 py-3 text-left font-medium text-gray-700">Ngày đặt</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={index} className="hover:bg-blue-50 transition duration-200 ease-in-out">
                <td className="border px-6 py-4 text-gray-800">{order.to_address}</td>
                <td className="border px-6 py-4 text-gray-800">{order.to_phone}</td>
                <td className="border px-6 py-4 text-gray-800">
                  <span
                    className={`${
                      order.status === 'Đang giao' ? 'bg-yellow-400' : 'bg-green-400'
                    } text-white px-2 py-1 rounded-full`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border px-6 py-4 text-gray-800">{order.order_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
