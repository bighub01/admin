import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../api/Category/categoryCre";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.category);
  
  console.log("CategoryList State:", categories);

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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Danh Sách Danh Mục</h2>
      {isLoading && <p className="text-blue-500">Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.idCategory} // Kiểm tra API có trả về `id` hay `idCategory`
            className="p-2 border rounded text-white bg-blue-400 flex justify-between items-center"
          >
            {category.categoryName}
            <button
              onClick={() => handleDelete(category.idCategory)}
              className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
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
