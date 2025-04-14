import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistrictWard } from "../../api/user/user";

const LocationLookup = () => {
  const dispatch = useDispatch();
  const { locationData, loading, error } = useSelector(
    (state) => state.location
  );
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!province || !district || !ward) {
      alert("Vui lòng nhập đầy đủ tỉnh, huyện và xã.");
      return;
    }
    dispatch(
      fetchDistrictWard({
        province: province.trim(),
        district: district.trim(),
        ward: ward.trim(),
      })
    );
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Ward"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tra cứu
        </button>
      </form>

      {loading && <p className="mt-4 text-yellow-500">Đang tải dữ liệu...</p>}
      {error && <p className="mt-4 text-red-500">Lỗi: {error}</p>}
      {locationData && (
        <div className="mt-4">
          <p className="font-semibold">Kết quả:</p>
          <ul className="list-disc pl-5">
            {Object.entries(locationData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationLookup;
