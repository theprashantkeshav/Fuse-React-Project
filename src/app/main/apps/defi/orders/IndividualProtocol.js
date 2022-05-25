import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import FuseLoading from "@fuse/core/FuseLoading";
import Widgets1 from "./Widgets/Widgets1";
import Widgets2 from "./Widgets/Widgets2";
import Widgets3 from "./Widgets/Widgets3";
import Widgets4 from "./Widgets/Widgets4";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const IndividualProtocol = () => {
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

  const { protocol } = useParams();
  // const dispatch = useDispatch();
  // const orders = useSelector(selectOrders);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  // console.log(data.currentChainTvls.Avalanche);

  var allTvl = data.tvl?.map((t) => {
    return [new Date(t.date * 1000).toLocaleString(), t.totalLiquidityUSD];
  });

  var oneYearTvl = data.tvl?.map((t) => {
    const lyUnix = Math.floor(
      new Date(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      ).getTime() / 1000
    );

    if (t.date >= lyUnix) {
      return [new Date(t.date * 1000).toLocaleString(), t.totalLiquidityUSD];
    }
  });

  oneYearTvl = oneYearTvl?.filter(function (element) {
    return element !== undefined;
  });

  var oneMonthTvl = data.tvl?.map((t) => {
    const lmUnix = Math.floor(
      new Date(
        new Date(new Date().setMonth(new Date().getMonth() - 1))
      ).getTime() / 1000
    );

    if (t.date >= lmUnix) {
      return [new Date(t.date * 1000).toLocaleString(), t.totalLiquidityUSD];
    }
  });

  oneMonthTvl = oneMonthTvl?.filter(function (element) {
    return element !== undefined;
  });

  const tvlChains = data.chains;

  const options = { labels: tvlChains };

  const tvlChainsData = tvlChains?.map((c) => {
    return data.currentChainTvls[c];
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://api.llama.fi/protocol/${protocol}`
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const widgets1 = {
    id: "widget1",
    series: {
      "1M": [
        {
          name: "TVL",
          data: oneMonthTvl,
          fill: "start",
        },
      ],
      "1Y": [
        {
          name: "TVL",
          data: oneYearTvl,
          fill: "start",
        },
      ],
      ALL: [
        {
          name: "TVL",
          data: allTvl,
          fill: "start",
        },
      ],
    },
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

  const widgets3 = {
    id: "widget3",
    description: {
      value: data.description,
      ofTarget: 12,
    },
    series: [
      {
        name: "Discription",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "100%",
        sparkline: {
          enabled: true,
        },
      },
      xaxis: {
        categories: [
          "Jan 1",
          "Jan 2",
          "Jan 3",
          "Jan 4",
          "Jan 5",
          "Jan 6",
          "Jan 7",
          "Jan 8",
          "Jan 9",
          "Jan 10",
          "Jan 11",
          "Jan 12",
          "Jan 13",
          "Jan 14",
          "Jan 15",
        ],
      },
      fill: {
        type: "solid",
        opacity: 0.7,
      },
      tooltip: {
        followCursor: true,
        theme: "dark",
        fixed: {
          enabled: false,
          position: "topRight",
          offsetX: 0,
          offsetY: 0,
        },
      },
    },
  };

  return (
    <div>
      {loading && <FuseLoading />}
      {!loading && (
        <div className="w-full">
          <div>
            <motion.div
              className="flex flex-col md:flex-row sm:p-8 container"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <Typography className="h1 font-semibold" color="textPrimary">
                {data.name} Overview{" "}
              </Typography>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row sm:p-8 container"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <Typography className="h3 font-semibold" color="textPrimary">
                {data.category}
              </Typography>
            </motion.div>
            <Widgets1 data={widgets1} name={data.name} />
            <motion.div
              className="flex flex-col md:flex-row sm:p-8 container"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="flex flex-1 flex-col min-w-0 pt-16">
                <div className="flex flex-col sm:flex sm:flex-row pb-32">
                  <motion.div variants={item} className="widget w-full p-16">
                    <Widgets2 protocol={protocol} />
                  </motion.div>

                  <motion.div variants={item} className="widget w-full p-16">
                    <Widgets3 data={widgets3} />
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-1 flex-col min-w-0 pt-16">
                <div className="mb-32 w-full sm:w-1/2 md:w-full">
                  {" "}
                  <motion.div variants={item} className="widget w-full p-16">
                    <Widgets4 options={options} series={tvlChainsData} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualProtocol;
