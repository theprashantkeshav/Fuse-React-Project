import { combineReducers } from "@reduxjs/toolkit";
import order from "./orderSlice";
import orders from "./ordersSlice";
import product from "./productSlice";
import products from "./productsSlice";
import protocolReducer from "./individualProtocolSlice";

const reducer = combineReducers({
  products,
  product,
  orders,
  order,
  protocolReducer,
});

export default reducer;
