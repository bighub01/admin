import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../api/Category/categoryCre";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories())
      .unwrap()
      .catch((err) => console.error("Lỗi khi tải danh mục:", err));
  }, []);

  const handleDelete = (id) => {
    try {
      dispatch(deleteCategory(id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-green-200 to-blue-300 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Danh Sách Danh Mục</h2>
      
      {isLoading && <p className="text-blue-500 text-center">Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.idCategory} // Kiểm tra API có trả về `id` hay `idCategory`
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex justify-between items-center"
          >
            <span className="text-lg font-semibold text-gray-700">{category.categoryName}</span>
            <button
              onClick={() => handleDelete(category.idCategory)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
