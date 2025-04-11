import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../api/Product/productCre";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  // Gọi API lấy danh sách sản phẩm khi component được render
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Xử lý xóa sản phẩm
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-blue-200 to-indigo-300 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Danh Sách Sản Phẩm</h2>

      {loading && <p className="text-blue-500 text-center">Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white rounded-lg border-separate border-spacing-0">
          <thead className="bg-gray-100">
            <tr className="text-left">
            
              <th className="py-4 px-6 border-b text-lg text-gray-600">Tên</th>
              <th className="py-4 px-6 border-b text-lg text-gray-600">Giá</th>
              <th className="py-4 px-6 border-b text-lg text-gray-600">URL</th>
              <th className="py-4 px-6 border-b text-lg text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.idProduct} className="hover:bg-gray-50 transition duration-200 ease-in-out">
             
                <td className="py-4 px-6 border-b text-center">{product.productName}</td>
                <td className="py-4 px-6 border-b text-center">{product.price} VND</td>
                <td className="py-4 px-6 border-b text-center">
                  {product.url && (
                    <img
                      src={product.url}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <button
                    onClick={() => handleDelete(product.idProduct)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
