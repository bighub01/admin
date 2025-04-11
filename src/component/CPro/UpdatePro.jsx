import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../../api/Product/productCre";
import { fetchCategories } from "../../api/Category/categoryCre";

const UpdateProductForm = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [idCategory, setIdCategory] = useState(""); // Thêm state để lưu idCategory

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.productName || "");
      setPrice(selectedProduct.price || "");
      setPreview(selectedProduct.url || "");
      setIdCategory(selectedProduct.idCategory || ""); // Gán idCategory khi chọn sản phẩm
    }
  }, [selectedProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!productName || !price || !idCategory) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
      return;
    }
  
    if (!image) {
      alert("Vui lòng chọn ảnh sản phẩm!");
      return;
    }
  
    if (!selectedProduct?.idProduct) {
      alert("Sản phẩm không hợp lệ!");
      return;
    }
  
    // Gửi dữ liệu sản phẩm kèm ảnh và idProduct
    const productData = {
      idProduct: selectedProduct.idProduct, // ✅ Thêm idProduct để cập nhật
      productName,
      price,
      idCategory,
      file: image,
    };
  
    dispatch(updateProduct(productData));
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-green-200 to-blue-300 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Cập Nhật Sản Phẩm</h2>

      {/* Combobox chọn sản phẩm */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Chọn sản phẩm</label>
        <select
          value={selectedProduct?.idProduct || ""}
          onChange={(e) =>
            setSelectedProduct(products.find((p) => p.idProduct === e.target.value))
          }
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        >
          <option value="">Chọn sản phẩm...</option>
          {products.map((product) => (
            <option key={product.idProduct} value={product.idProduct}>
              {product.productName}
            </option>
          ))}
        </select>
      </div>

      {/* Form cập nhật sản phẩm */}
      {selectedProduct && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Tên sản phẩm</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Giá sản phẩm</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Ảnh sản phẩm</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md" />}
          </div>

          {/* Combobox chọn danh mục */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Chọn danh mục</label>
            <select
              value={idCategory}
              onChange={(e) => setIdCategory(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              required
            >
              <option value="">Chọn danh mục...</option>
              {categories.map((category) => (
                <option key={category.idCategory} value={category.idCategory}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-200 ease-in-out disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default UpdateProductForm;
