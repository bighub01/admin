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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Cập Nhật Sản Phẩm</h2>

      {/* Combobox chọn sản phẩm */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Chọn sản phẩm</label>
        <select
          value={selectedProduct?.idProduct || ""}
          onChange={(e) =>
            setSelectedProduct(products.find((p) => p.idProduct === e.target.value))
          }
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ảnh sản phẩm</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
            {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
          </div>

          {/* Combobox chọn danh mục */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Chọn danh mục</label>
            <select
              value={idCategory}
              onChange={(e) => setIdCategory(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
          </button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default UpdateProductForm;
