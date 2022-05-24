import { lazy } from "react";
// import Home from '../../home/Home';

const CoinDetail = lazy(() => import("./coinDetail/CoinDetail"));
const CoinList = lazy(() => import("./CoinList"));
const CoinList100 = lazy(() => import("./CoinList100"));

const CoinListConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/assets/price/:assetId",
      element: <CoinDetail />,
    },
    {
      path: "/assets/price/all",
      element: <CoinList />,
    },
    {
      path: "/assets/price/top100",
      element: <CoinList100 />,
    },
  ],
};

export default CoinListConfig;
