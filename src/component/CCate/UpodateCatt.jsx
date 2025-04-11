import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, updateCategory } from "../../api/Category/categoryCre";

const UpdateCategoryForm = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategory(id);
    const category = categories.find((cat) => cat.idCategory === id);
    setCategoryName(category ? category.categoryName : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert("Vui lòng chọn danh mục cần cập nhật");
      return;
    }
    dispatch(updateCategory({ idCategory: selectedCategory, categoryName }));
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-200 to-indigo-300 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Cập Nhật Danh Mục</h2>

      {loading && <p className="text-blue-500 text-center">Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Chọn danh mục</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((category) => (
              <option key={category.idCategory} value={category.idCategory}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Tên danh mục</label>
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
          {loading ? "Đang cập nhật..." : "Cập nhật danh mục"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
