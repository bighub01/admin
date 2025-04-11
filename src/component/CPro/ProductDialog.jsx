import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../api/Category/categoryCre";
import {
  createProduct,
  fetchProducts,
  deleteProduct,
} from "../../api/Product/productCre";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  const { categories, loading: loadingCategories } = useSelector(
    (state) => state.category
  );

  const [isOpen, setIsOpen] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingCreate(true);
    if (!image) {
      alert("Vui lòng chọn ảnh sản phẩm!");
      setLoadingCreate(false);
      return;
    }

    const productData = {
      productName,
      price,
      idCategory,
      file: image,
    };

    await dispatch(createProduct(productData));
    setLoadingCreate(false);
    setIsOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-indigo-300 to-blue-400 shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Danh Sách Sản Phẩm
      </h2>

      {/* Nút tạo sản phẩm */}
      <Button
        onClick={() => setIsOpen(true)}
        className="mb-6 px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold text-xl rounded-full shadow-lg transform hover:scale-110 transition-all duration-500 ease-in-out hover:shadow-2xl"
      >
        <span className="flex items-center justify-center space-x-2">
          <i className="fas fa-plus-circle"></i>
          <span>Tạo Sản Phẩm</span>
        </span>
      </Button>

      {loading && <p className="text-blue-700 text-center">Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white rounded-lg border-separate border-spacing-0">
          <thead className="bg-gradient-to-r from-blue-200 to-indigo-300">
            <tr className="text-left">
              <th className="py-4 px-6 border-b text-lg text-gray-600">Tên</th>
              <th className="py-4 px-6 border-b text-lg text-gray-600">Giá</th>
              <th className="py-4 px-6 border-b text-lg text-gray-600">URL</th>
              <th className="py-4 px-6 border-b text-lg text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.idProduct}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="py-4 px-6 border-b text-center">{product.productName}</td>
                <td className="py-4 px-6 border-b text-center">{product.price} VND</td>
                <td className="py-4 px-6 border-b text-center">
                  {product.url && (
                    <img
                      src={product.url}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-lg shadow-md mx-auto"
                    />
                  )}
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <button
                    onClick={() => handleDelete(product.idProduct)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog tạo sản phẩm */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <h2 className="text-3xl font-bold text-center text-blue-600 tracking-wide">
            🎁 Thêm Sản Phẩm Mới
          </h2>
        </DialogTitle>

        <DialogContent>
          <form className="space-y-5 mt-2">
            {/* Tên sản phẩm */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                📦 Tên sản phẩm
              </label>
              <TextField
                name="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ví dụ: cây hoa cao cấp"
                fullWidth
                required
                variant="outlined"
                className="text-base"
              />
            </div>

            {/* Giá sản phẩm */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                💰 Giá sản phẩm
              </label>
              <TextField
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Nhập giá (VND)"
                fullWidth
                required
                variant="outlined"
                className="text-base"
              />
            </div>

            {/* Danh mục */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                🗂️ Danh mục
              </label>
              <select
                value={idCategory}
                onChange={(e) => setIdCategory(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {loadingCategories ? (
                  <option disabled>Đang tải...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.idCategory} value={cat.idCategory}>
                      {cat.categoryName}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Ảnh sản phẩm */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                🖼️ Ảnh sản phẩm
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border-2 border-dashed border-gray-400 rounded-xl text-base cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
          </form>
        </DialogContent>

        <DialogActions className="pb-4 px-6">
          <Button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-red-500 text-lg">
            Hủy
          </Button>
          {loadingCreate ? (
            <Button disabled className="bg-blue-400 text-white px-6 py-2 rounded-xl text-lg">
              Đang tạo...
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-xl text-lg hover:from-green-500 hover:to-blue-600"
            >
              ✅ Tạo sản phẩm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
