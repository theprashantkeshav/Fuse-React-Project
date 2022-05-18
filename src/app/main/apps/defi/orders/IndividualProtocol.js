import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Widgets1 from "./Widgets/Widgets1";
import Widgets2 from "./Widgets/Widgets2";
import Widgets3 from "./Widgets/Widgets3";
import Widgets4 from "./Widgets/Widgets4";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://api.llama.fi/protocols"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const protocolTvl = data.map((pd) => {
    if (pd.name.replace(/\s/g, "-").toLowerCase() === protocol) {
      return Math.abs(Number(pd.tvl)) >= 1.0e9
        ? (Math.abs(Number(pd.tvl)) / 1.0e9).toFixed(2) + "B"
        : // Six Zeroes for Millions
        Math.abs(Number(pd.tvl)) >= 1.0e6
        ? (Math.abs(Number(pd.tvl)) / 1.0e6).toFixed(2) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(pd.tvl)) >= 1.0e3
        ? (Math.abs(Number(pd.tvl)) / 1.0e3).toFixed(2) + "K"
        : Math.abs(Number(pd.tvl));
    }
  });

  console.log(protocolTvl);

  const protocolDescription = data.map((pd) => {
    if (pd.name.replace(/\s/g, "-").toLowerCase() === protocol) {
      return pd.description;
    }
  });

  const widgets1 = {
    id: "widget1",
    series: {
      "1M": [
        {
          name: "TVL",
          data: [1.9, 3, 3.4, 2.2, 2.9, 3.9, 2.5, 3.8, 4.1, 3.8, 3.2, 2.9],
          fill: "start",
        },
      ],
      "1Y": [
        {
          name: "TVL",
          data: [2.2, 2.9, 3.9, 2.5, 3.8, 3.2, 2.9, 1.9, 3, 3.4, 4.1, 3.8],
          fill: "start",
        },
      ],
      ALL: [
        {
          name: "TVL",
          data: [3.9, 2.5, 3.8, 4.1, 1.9, 3, 3.8, 3.2, 2.9, 3.4, 2.2, 2.9],
          fill: "start",
        },
      ],
    },
    options: {
      chart: {
        type: "area",
        height: "100%",
        background: "transparent",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      theme: {
        mode: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
      },
      markers: {
        size: 3,
        strokeWidth: 1.5,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 2,
        hover: {
          size: 5,
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

  const widgets2 = {
    id: "widget2",
    conversion: {
      value: protocolTvl,
      ofTarget: 13,
    },
    series: [
      {
        name: "TVL",
        data: [67000, 54000, 82000, 57000, 72000, 57000, 87000],
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
      fill: {
        type: "solid",
        opacity: 0.7,
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
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

  const widgets3 = {
    id: "widget3",
    description: {
      value: protocolDescription,
      ofTarget: 12,
    },
    series: [
      {
        name: "Discription",
        data: [
          67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700,
          112000, 136000, 110000, 149000, 98000,
        ],
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

  const widgets4 = {
    id: "widget7",
    series: {
      Today: [
        {
          data: [92.8, 6.1, 1.1],
          change: [-0.6, 0.7, 0.1],
        },
      ],
      Yesterday: [
        {
          data: [77.2, 8.4, 14.4],
          change: [-2.3, 0.3, -0.2],
        },
      ],
      "Last 7 days": [
        {
          data: [88.2, 9.2, 2.6],
          change: [1.9, -0.4, 0.3],
        },
      ],
      "Last 28 days": [
        {
          data: [65.2, 2.6, 32.2],
          change: [-12.6, -0.7, 4.2],
        },
      ],
      "Last 90 days": [
        {
          data: [93.5, 4.2, 2.3],
          change: [2.6, -0.7, 2.1],
        },
      ],
    },
    options: {
      chart: {
        height: "100%",
        type: "donut",
      },
      labels: ["Desktop", "Mobile", "Tablet"],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: undefined,
      },
      fill: {
        opacity: 1,
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
          },
        },
      },
    },
  };

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div className="w-full">
          {data.map((n, index) => {
            if (n.name.replace(/\s/g, "-").toLowerCase() === protocol) {
              return (
                <div key={index}>
                  <motion.div
                    className="flex flex-col md:flex-row sm:p-8 container"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <Typography
                      className="h1 font-semibold"
                      color="textPrimary"
                    >
                      {n.name} Overview{" "}
                    </Typography>
                  </motion.div>
                  <Widgets1 data={widgets1} name={n.name} />
                  <motion.div
                    className="flex flex-col md:flex-row sm:p-8 container"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <div className="flex flex-1 flex-col min-w-0 pt-16">
                      <div className="flex flex-col sm:flex sm:flex-row pb-32">
                        <motion.div
                          variants={item}
                          className="widget w-full p-16"
                        >
                          <Widgets2 data={widgets2} />
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="widget w-full p-16"
                        >
                          <Widgets3 data={widgets3} />
                        </motion.div>
                      </div>
                    </div>

                    <div className="flex flex-wrap w-full md:w-320 pt-16">
                      <div className="mb-32 w-full sm:w-1/2 md:w-full">
                        {" "}
                        <motion.div
                          variants={item}
                          className="widget w-full p-16"
                        >
                          <Widgets4 data={widgets4} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default IndividualProtocol;
