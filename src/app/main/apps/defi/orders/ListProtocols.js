import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import FuseLoading from "@fuse/core/FuseLoading";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders, getOrders } from "../store/ordersSlice";
import Widgets5 from "./Widgets/Widgets5";
import Widgets6 from "./Widgets/Widgets6";
import Widgets7 from "./Widgets/Widgets7";
import Widgets8 from "./Widgets/Widgets8";
import DropDown from "./Dropdown/DropDown";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const ListProtocols = () => {
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

  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState({
    chainData: null,
    chartData: null,
  });
  const [listData, setListData] = useState(orders);
  // console.log(listData);

  // console.log(allData.chartData);

  useEffect(() => {
    if (searchText.length !== 0) {
      setListData(FuseUtils.filterArrayByString(orders, searchText));
    } else {
      setListData(orders);
    }
  }, [orders, searchText]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const chains = await axios.get(`https://api.llama.fi/chains`, {
          redirect: "follow",
        });
        const charts = await axios.get(`https://api.llama.fi/charts`, {
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
  }, []);

  useEffect(() => {
    dispatch(getOrders()).then((res) => {
      setLoading(false);
    });
  }, [dispatch]);

  const chainName = allData.chainData?.map((cd) => {
    return cd.name;
  });

  const allChartData = allData.chartData?.map((cd) => {
    return [new Date(cd.date * 1000).toLocaleString(), cd.totalLiquidityUSD];
  });

  var TotalTvl = allData.chartData?.map((cd) => {
    return cd.totalLiquidityUSD;
  });

  var currentTotalTvl = TotalTvl?.pop();

  var lastDayTvl = TotalTvl?.at(-2);

  var percDiff =
    100 *
    Math.abs(
      (currentTotalTvl - lastDayTvl) / ((lastDayTvl + currentTotalTvl) / 2)
    );

  const dominanceName = listData[0]?.name;
  const dominanceTVL = listData[0]?.tvl;

  const dominancePer = (dominanceTVL / currentTotalTvl) * 100;
  console.log(dominancePer);

  const widgets5 = {
    id: "widget5",
    series: [
      {
        name: "Total TVL",
        data: allChartData,
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
      <div className="w-full">
        <div>
          <motion.div
            className="flex flex-col md:flex-row sm:p-8 container"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Typography className="h1 font-semibold" color="textPrimary">
              TVL Ranking
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
          <Widgets5 data={widgets5} />
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

export default ListProtocols;
