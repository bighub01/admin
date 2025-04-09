import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../api/Product/productCre";
import { fetchCategories } from "../../api/Category/categoryCre";

const ProductForm = () => {
  const dispatch = useDispatch();

  // Lấy danh sách danh mục từ Redux store
  const { categories, loading: loadingCategories } = useSelector(
    (state) => state.category
  );
  const { loading, error, product } = useSelector((state) => state.product);

  // State cho input form
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [idCategory, setIdCategory] = useState(""); // Sử dụng idCategory thay vì categoryName
  const [image, setImage] = useState(null);

  // Fetch danh mục khi component được mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Xử lý chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert("Vui lòng chọn ảnh sản phẩm!");
      return;
    }
  
    // Gửi dữ liệu sản phẩm kèm ảnh
    const productData = {
      productName,
      price,
      idCategory,
      file: image, // ✅ Cần đúng key là "file"
    };
  
    dispatch(createProduct(productData));
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Tạo Sản Phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nhập tên sản phẩm */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
          <input
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Nhập giá sản phẩm */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
          <input
            type="text"
            placeholder="Nhập giá sản phẩm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Chọn danh mục bằng combobox */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Danh mục</label>
          <select
            value={idCategory}
            onChange={(e) => setIdCategory(e.target.value)} // Sử dụng idCategory thay vì categoryName
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Chọn danh mục</option>
            {loadingCategories ? (
              <option disabled>Đang tải danh mục...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.idCategory} value={cat.idCategory}>
                  {cat.categoryName}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Chọn ảnh sản phẩm */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Ảnh sản phẩm</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Nút tạo sản phẩm */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo sản phẩm"}
        </button>

        {/* Hiển thị thông báo lỗi hoặc thành công */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {product && <p className="text-green-500 text-center mt-2">Sản phẩm đã được tạo thành công!</p>}
      </form>
    </div>
  );
};

export default ProductForm;
