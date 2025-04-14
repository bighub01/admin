import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculate } from "../../api/order/order";

const CalculateFeeForm = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({
    from_district_id: 0,
    from_ward_code: "",
    service_id: 0,
    service_type_id: 0,
    to_district_id: 0,
    to_ward_code: "", // 👈
    height: 0,
    length: 0,
    weight: 0,
    width: 0,
    insurance_value: 0,
    cod_failed_amount: 0,
    coupon: "",
    items: [
      {
        name: "",
        quantity: 0,
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
      },
    ],
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("item_")) {
      const [_, field] = name.split("_");
      setFormData((prev) => ({
        ...prev,
        items: [
          {
            ...prev.items[0],
            [field]: field === "name" ? value : Number(value),
          },
        ],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          isNaN(value) || name.includes("code") || name === "coupon"
            ? value
            : Number(value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending data:", formData); // 👈 thêm dòng này
    dispatch(calculate(formData));
  };
  

  return (
    <div className="p-4 max-w-xl mx-auto border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Tính phí giao hàng</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="from_district_id"
          placeholder="from_district_id"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="from_ward_code"
          placeholder="from_ward_code"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="service_id"
          placeholder="service_id"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="service_type_id"
          placeholder="service_type_id"
          onChange={handleChange}
          className="border p-2 w-full"
        />
           <input
          name="to_district_id"
          placeholder="to_district_id"
          onChange={handleChange}
          className="border p-2 w-full"
        />
         <input
          name="to_ward_code"
          placeholder="to_ward_code"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="height"
          placeholder="height"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="length"
          placeholder="length"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="weight"
          placeholder="weight"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="width"
          placeholder="width"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="insurance_value"
          placeholder="insurance_value"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="cod_failed_amount"
          placeholder="cod_failed_amount"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="coupon"
          placeholder="coupon"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <h3 className="font-medium mt-4">Thông tin sản phẩm:</h3>
        <input
          name="item_name"
          placeholder="Tên sản phẩm"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="item_quantity"
          placeholder="Số lượng"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="item_height"
          placeholder="Chiều cao"
          onChange={handleChange}
          className="border p-2 w-full"
        />
         <input
          name="item_weight"
          placeholder="Khối lượng"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="item_length"
          placeholder="Chiều dài"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="item_width"
          placeholder="Chiều rộng"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Gửi yêu cầu
        </button>
      </form>

      {loading && <p className="mt-4 text-yellow-500">Đang tính phí...</p>}
      {error && <p className="mt-4 text-red-500">Lỗi: {error}</p>}
      {data && (
        <div className="mt-4 p-2 bg-green-100 border rounded">
          <p className="font-semibold">Kết quả:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CalculateFeeForm;
