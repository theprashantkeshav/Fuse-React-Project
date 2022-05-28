import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import { styled } from "@mui/material/styles";
import reducer from "../store";
import OrdersHeader from "./OrdersHeader";
import ChainOrderTable from "./ChainOrderTable";
import IndividualChain from "./IndividualChain";
import { useState } from "react";
import { useParams } from "react-router-dom";

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

function ChainUI() {
  const { chain } = useParams();

  return (
    <>
      <OrdersHeader />
      <IndividualChain params={chain} />
      <ChainOrderTable params={chain} />
    </>
  );
}

export default withReducer("eCommerceApp", reducer)(ChainUI);
