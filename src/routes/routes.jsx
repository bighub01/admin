import ProductForm from "../component/CPro/CreatePro";
import ProductList from "../component/CPro/GetallPro";
import UpdateProductForm from "../component/CPro/UpdatePro";
import CategoryList from "../component/CCate/GetallCat";
import UpdateCategoryForm from "../component/CCate/UpodateCatt";
import CreateCategoryForm from "../component/CCate/CreateCat";
import OrderTable from "../component/order/order_table";
import OrderInfoComponent from "../component/order/order_info";
import SelectProvince from "../component/provinces/ProvinceInfo";
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
    path: "/OrderTable",
    component: OrderTable,
  },
  {
    path: "/OrderInfoComponent",
    component: OrderInfoComponent,
  },
  {
    path: "/SelectProvince",
    component: SelectProvince,
  },
];

const priviteRoute = [];

export default { publicRoute, priviteRoute };
