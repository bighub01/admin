import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../api/Product/productCre";
import { fetchCategories } from "../../api/Category/categoryCre";
import ProductList from "./ProductDialog";

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
  const [idCategory, setIdCategory] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false); // Thay đổi từ string thành boolean

  // Fetch danh mục khi component mount
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

  // Hiển thị thông báo khi tạo thành công
  useEffect(() => {
    if (product) {
      setProductName("");
      setPrice("");
      setIdCategory("");
      setImage(null);
      setSuccessMessage(true);

      const timeout = setTimeout(() => {
        setSuccessMessage(false);
      }, 3000); // Hiển thị modal trong 3 giây

      return () => clearTimeout(timeout);
    }
  }, [product]);

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Vui lòng chọn ảnh sản phẩm!");
      return;
    }

    const productData = {
      productName,
      price,
      idCategory,
      file: image,
    };

    dispatch(createProduct(productData));
  };

  return (
    // <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-200 to-indigo-300 shadow-xl rounded-lg relative">
    //   <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Tạo Sản Phẩm</h2>
    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     {/* Nhập tên sản phẩm */}
    //     <div>
    //       <label className="block text-lg font-medium text-gray-700 mb-2">Tên sản phẩm</label>
    //       <input
    //         type="text"
    //         placeholder="Nhập tên sản phẩm"
    //         value={productName}
    //         onChange={(e) => setProductName(e.target.value)}
    //         className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
    //         required
    //       />
    //     </div>

    //     {/* Nhập giá sản phẩm */}
    //     <div>
    //       <label className="block text-lg font-medium text-gray-700 mb-2">Giá sản phẩm</label>
    //       <input
    //         type="text"
    //         placeholder="Nhập giá sản phẩm"
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)}
    //         className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
    //         required
    //       />
    //     </div>

    //     {/* Chọn danh mục */}
    //     <div>
    //       <label className="block text-lg font-medium text-gray-700 mb-2">Danh mục</label>
    //       <select
    //         value={idCategory}
    //         onChange={(e) => setIdCategory(e.target.value)}
    //         className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
    //         required
    //       >
    //         <option value="">Chọn danh mục</option>
    //         {loadingCategories ? (
    //           <option disabled>Đang tải danh mục...</option>
    //         ) : (
    //           categories.map((cat) => (
    //             <option key={cat.idCategory} value={cat.idCategory}>
    //               {cat.categoryName}
    //             </option>
    //           ))
    //         )}
    //       </select>
    //     </div>

    //     {/* Chọn ảnh */}
    //     <div>
    //       <label className="block text-lg font-medium text-gray-700 mb-2">Ảnh sản phẩm</label>
    //       <input
    //         type="file"
    //         accept="image/*"
    //         onChange={handleImageChange}
    //         className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
    //         required
    //       />
    //     </div>

    //     {/* Nút submit */}
    //     <button
    //       type="submit"
    //       className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-200 ease-in-out disabled:bg-gray-400"
    //       disabled={loading}
    //     >
    //       {loading ? "Đang tạo..." : "Tạo sản phẩm"}
    //     </button>

    //     {/* Hiển thị lỗi */}
    //     {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    //   </form>

    //   {/* ✅ Dialog thông báo thành công */}
    //   {successMessage && (
    //     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    //       <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
    //         Sản phẩm đã được tạo thành công!
    //       </div>
    //     </div>
    //   )}
    // </div>
    <ProductList/>
  );
};

export default ProductForm;
