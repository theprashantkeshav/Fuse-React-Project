import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Product = lazy(() => import("./product/Product"));
const Products = lazy(() => import("./products/Products"));
const Order = lazy(() => import("./order/Order"));
const Orders = lazy(() => import("./orders/Orders"));
const IndividualProtocol = lazy(() => import("./orders/IndividualProtocol"));

const DeFiAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/e-commerce/products",
      element: <Products />,
    },
    {
      path: "apps/e-commerce/products/:productId/*",
      element: <Product />,
    },
    {
      path: "/defi/protocols",
      element: <Orders />,
    },
    {
      path: "/defi/protocols/:protocol",
      element: <IndividualProtocol />,
    },
    // {
    //   path: "/defi/protocols/widget1",
    //   element: <IndividualProtocol />,
    // },
    {
      path: "apps/e-commerce/orders/:orderId",
      element: <Order />,
    },
    {
      path: "apps/e-commerce",
      element: <Navigate to="products" />,
    },
  ],
};

export default DeFiAppConfig;
