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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Thêm Danh Mục Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên danh mục</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Đang thêm..." : "Thêm danh mục"}
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCategoryForm;
