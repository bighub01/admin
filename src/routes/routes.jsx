import ProductForm from "../component/CPro/CreatePro";
import ProductList from "../component/CPro/GetallPro";
import UpdateProductForm from "../component/CPro/UpdatePro";
import CategoryList from "../component/CCate/GetallCat";
import UpdateCategoryForm from "../component/CCate/UpodateCatt";
import CreateCategoryForm from "../component/CCate/CreateCat";
import LocationLookup from "../component/Cuser/fetchDistrictWard";
import CalculateFeeForm from "../component/order/order_info";
import SelectProvince from "../component/provinces/ProvinceInfo";
import OrderList from "../component/ListOderAndInfo/ListoOder";
import OrderDetailList from "../component/ListOderAndInfo/OrderInfo";
const publicRoute = [
  {
    path: "/",
    component: ProductForm,
  },
  {
    path: "/prolist",
    component: ProductList,
  },
  {
    path: "/proupdate",
    component: UpdateProductForm,
  },
  {
    path: "/category",
    component: CategoryList,
  },
  {
    path: "/catecreate",
    component: CreateCategoryForm,
  },
  {
    path: "/cateupdate",
    component: UpdateCategoryForm,
  },
  {
    path: "/LocationLookup",
    component: LocationLookup,
  },
  {
    path: "/OrderInfoComponent",
    component: CalculateFeeForm,
  },
  {
    path: "/SelectProvince",
    component: SelectProvince,
  },
  {
    path: "/OrderList",
    component: OrderList,
  },
  {
    path: "/order-detail/:orderCode", // 👈 route động để xem chi tiết đơn hàng
    component: OrderDetailList,
  },
];


const priviteRoute = [];

export default { publicRoute, priviteRoute };
