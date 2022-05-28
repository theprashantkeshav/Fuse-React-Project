import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import { styled } from "@mui/material/styles";
import FuseLoading from "@fuse/core/FuseLoading";
import reducer from "../store";
import OrdersHeader from "./OrdersHeader";
import OrdersTable from "./OrdersTable";
import ListProtocols from "./ListProtocols";
import { useState } from "react";

const Root = styled(FusePageCarded)(({ theme }) => ({
  "& .FusePageCarded-header": {
    minHeight: 72,
    height: 72,
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      minHeight: 136,
      height: 136,
    },
  },
  "& .FusePageCarded-content": {
    display: "flex",
  },
  "& .FusePageCarded-contentCard": {
    // overflow: "hidden",
  },
}));

function Orders() {
  return (
    <>
      <OrdersHeader />
      <ListProtocols />
      <OrdersTable />
    </>
  );
}

export default withReducer("eCommerceApp", reducer)(Orders);
