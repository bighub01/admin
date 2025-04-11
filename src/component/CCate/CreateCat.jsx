import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../api/Category/categoryCre";

const CreateCategoryForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      await dispatch(createCategory({ name: categoryName })).unwrap();
      setCategoryName(""); // Reset input sau khi gửi thành công
    } catch (error) {
      console.error("Lỗi khi tạo danh mục:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-200 to-indigo-300 shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Thêm Danh Mục Mới
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Tên danh mục
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Nhập tên danh mục"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-200 ease-in-out disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Đang thêm..." : "Thêm danh mục"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCategoryForm;
