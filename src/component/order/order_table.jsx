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
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left font-medium text-gray-700">to_address</th>
            <th className="border px-4 py-2 text-left font-medium text-gray-700">to_phone</th>
            <th className="border px-4 py-2 text-left font-medium text-gray-700">status</th>
            <th className="border px-4 py-2 text-left font-medium text-gray-700">order_date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{order.to_address}</td>
              <td className="border px-4 py-2">{order.to_phone}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">{order.order_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
