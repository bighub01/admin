import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts , deleteProduct } from "../../api/Product/productCre";

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Danh Sách Sản Phẩm</h2>

      {loading && <p className="text-blue-500 text-center">Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Tên</th>
              <th className="py-2 px-4 border">Giá</th>
              <th className="py-2 px-4 border">URL</th>
              <th className="py-2 px-4 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <tr key={product.idProduct} className="text-center">
                  <td className="py-2 px-4 border">{product.idProduct}</td>
                  <td className="py-2 px-4 border">{product.productName}</td>
                  <td className="py-2 px-4 border">{product.price} VND</td>
                  <td className="py-2 px-4 border">
                    {/* Hiển thị URL sản phẩm */}
                    {product.url ? (
                      <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {product.url}
                      </a>
                    ) : (
                      "Không có URL"
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(product.idProduct)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
