import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import FuseLoading from "@fuse/core/FuseLoading";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders, getOrders } from "../store/ordersSlice";

import Widgets6 from "./Widgets/Widgets6";
import Widgets7 from "./Widgets/Widgets7";
import Widgets8 from "./Widgets/Widgets8";
import Widgets9 from "./Widgets/Widgets9";
import DropDown from "./Dropdown/DropDown";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const IndividualChain = ({ params }) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const searchText = useSelector(
    ({ eCommerceApp }) => eCommerceApp.orders.searchText
  );

  const container = {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const [allData, setAllData] = useState({
    chainData: null,
    chartData: null,
  });
  const [chainData, setChainData] = useState(orders);
  const [loading, setLoading] = useState(true);

  // console.log(allData.chartData);

  var IndChainData = chainData?.map((da) => {
    if (da.chains.includes(params)) {
      return da;
    }
  });

  IndChainData = IndChainData?.filter(function (element) {
    return element !== undefined;
  });

  useEffect(() => {
    dispatch(getOrders()).then((res) => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setChainData(FuseUtils.filterArrayByString(orders, searchText));
    } else {
      setChainData(orders);
    }
  }, [orders, searchText]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        var chains = await axios.get(`https://api.llama.fi/chains`, {
          redirect: "follow",
        });
        var charts = await axios.get(`https://api.llama.fi/charts/${params}`, {
          redirect: "follow",
        });

        if (chains.config.url !== chains.request.responseURL) {
          response = await axios.get(response.request.responseURL);
        }

        if (charts.config.url !== charts.request.responseURL) {
          response = await axios.get(response.request.responseURL);
        }

        setAllData({
          chainData: chains.data,
          chartData: charts.data,
        });
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [params]);

  const chainName = allData.chainData?.map((cd) => {
    return cd.name;
  });

  const individualChainData = allData.chartData?.map((cd) => {
    return [new Date(cd.date * 1000).toLocaleString(), cd.totalLiquidityUSD];
  });

  var IndividualTvl = allData.chartData?.map((cd) => {
    return cd.totalLiquidityUSD;
  });

  var currentTotalTvl = IndividualTvl?.pop();

  var lastDayTvl = IndividualTvl?.at(-2);

  var percDiff =
    100 *
    Math.abs(
      (currentTotalTvl - lastDayTvl) / ((lastDayTvl + currentTotalTvl) / 2)
    );

  const dominanceName = IndChainData[0]?.name;
  const dominanceTVL = IndChainData[0]?.tvl;

  const dominancePer = (dominanceTVL / currentTotalTvl) * 100;
  console.log(dominancePer);

  const widgets9 = {
    id: "widget9",
    series: [
      {
        name: "Total TVL",
        data: individualChainData,
        fill: "start",
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: "100%",
        background: "transparent",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      theme: {
        mode: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: false,
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },

        decimalsInFloat: 2,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: (value) => {
            return value > 1000000
              ? `$${formatter.format(value)}`
              : `$${(Math.round(value * 100) / 100).toLocaleString()}`;
          },
        },
      },
      fill: {
        type: "solid",
        opacity: 0.7,
        gradient: {
          shadeIntensity: 0.4,
          opacityFrom: 1,
          opacityTo: 0.5,
          stops: [30, 100, 100],
        },
      },
      grid: {
        show: true,
        strokeDashArray: 3,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 1.5,
        dashArray: 0,
      },
    },
  };

  if (loading) {
    return <FuseLoading />;
  }

  return (
    <div>
      {" "}
      <div className="w-full">
        <div>
          <motion.div
            className="flex flex-col md:flex-row sm:p-8 container"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Typography className="h1 font-semibold" color="textPrimary">
              {params}
            </Typography>
          </motion.div>
          <motion.div
            className="flex flex-col md:flex-row sm:p-8 container"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Typography className="h3 font-semibold" color="textPrimary">
              Monitor metrics, check reports and review performance
            </Typography>
          </motion.div>
          <Widgets9 data={widgets9} />
          <motion.div
            className="flex flex-col md:flex-row sm:p-8 container"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-1 flex-col min-w-0 pt-16">
              <div className="flex flex-col sm:flex sm:flex-row pb-32">
                <motion.div variants={item} className="widget w-full p-16">
                  <Widgets6 currentTotalTvl={currentTotalTvl} />
                </motion.div>

                <motion.div variants={item} className="widget w-full p-16">
                  <Widgets7
                    percDiff={percDiff}
                    currentTotalTvl={currentTotalTvl}
                    lastDayTvl={lastDayTvl}
                  />
                </motion.div>

                <motion.div variants={item} className="widget w-full p-16">
                  <Widgets8
                    dominanceName={dominanceName}
                    dominancePer={dominancePer}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div>
        {" "}
        <DropDown chainName={chainName} />
      </div>
    </div>
  );
};

export default IndividualChain;
