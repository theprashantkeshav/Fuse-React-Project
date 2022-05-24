/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */

import _ from "@lodash";
import { styled, ThemeProvider, useTheme, alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { memo, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { selectContrastMainTheme } from "app/store/fuse/settingsSlice";
import Box from "@mui/material/Box";
import { getAssetChart } from "app/main/apps/coinList/store/assetChartSlice";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
}));
const formatter = Intl.NumberFormat("en", { notation: "compact" });

const tabs = [
  { title: "24H", day: 1, interval: "hourly" },
  { title: "7D", day: 7, interval: "hourly" },
  { title: "14D", day: 14, interval: "daily" },
  { title: "30D", day: 30, interval: "daily" },
  { title: "90D", day: 90, interval: "daily" },
  { title: "180D", day: 180, interval: "daily" },
  { title: "1Y", day: 365, interval: "daily" },
  { title: "ALL", day: 5 * 365, interval: "daily" },
];
let options = {
  chart: {
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
          ? formatter.format(value)
          : (Math.round(value * 100) / 100).toLocaleString();
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
};

function CoinChart({ assetId, assetName, symbol }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(2);
  const [series, setSeries] = useState([]);
  const [index, setIndex] = useState("prices");
  const contrastTheme = useSelector(
    selectContrastMainTheme(theme.palette.primary.main)
  );
  const { assetChart } = useSelector(({ coinList }) => coinList);

  console.log(series);

  _.setWith(options, "fill.colors", [theme.palette.secondary.main]);
  _.setWith(options, "markers.colors", [theme.palette.secondary.main]);
  _.setWith(options, "stroke.colors", [theme.palette.primary.contrastText]);
  _.setWith(options, "markers.strokeColors", [
    theme.palette.primary.contrastText,
  ]);
  _.setWith(
    options,
    "grid.borderColor",
    alpha(theme.palette.primary.contrastText, 0.3)
  );

  useEffect(() => {
    if (assetId) {
      dispatch(
        getAssetChart({
          assetId,
          day: tabs[tabValue].day,
          interval: `${tabs[tabValue].interval}`,
        })
      )
        .unwrap()
        .then((originalPromiseResult) => {
          const temp = originalPromiseResult[`${index}`];
          const tempSeries = [{ name: "Price", data: temp }];
          if (index === "market_caps") {
            tempSeries[0].name = "Market Cap";
          }
          console.log("🚀  -> tempSeries", tempSeries);
          setSeries(tempSeries);
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          console.log(
            "rejectedValueOrSerializedError=",
            rejectedValueOrSerializedError
          );
        });
    }
  }, [assetId, tabValue]);
  useEffect(() => {
    if (assetChart) {
      const temp = assetChart[`${index}`];
      const tempSeries = [{ name: "Price", data: temp }];
      setSeries(tempSeries);
    }
  }, [index]);

  return (
    <ThemeProvider theme={contrastTheme}>
      <Root>
        <div className="container relative p-16 sm:p-24 flex flex-col sm:flex-row justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col items-center sm:items-start mb-16 sm:mb-0">
              <Typography className="h2 font-semibold" color="textPrimary">
                {assetName}
              </Typography>

              <Typography className="h5 font-medium" color="textSecondary">
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: index === "prices" ? 600 : 100,
                  }}
                  onClick={() => setIndex("prices")}
                >
                  {" "}
                  Price
                </span>{" "}
                |{" "}
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: index === "market_caps" ? 600 : 100,
                  }}
                  onClick={() => setIndex("market_caps")}
                >
                  MarketCap
                </span>
              </Typography>
            </div>
          </motion.div>

          <div className="flex flex-row items-center">
            <Tabs
              value={tabValue}
              onChange={(event, value) => setTabValue(value)}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons={false}
              className="w-full -mx-4 min-h-40"
              classes={{
                indicator: "flex justify-center bg-transparent w-full h-full",
              }}
              TabIndicatorProps={{
                children: (
                  <Box
                    sx={{ bgcolor: "text.disabled" }}
                    className="w-full h-full rounded-full opacity-20"
                  />
                ),
              }}
            >
              {tabs.map((key) => (
                <Tab
                  key={key.title}
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 capitalize"
                  disableRipple
                  label={key.title}
                />
              ))}
            </Tabs>
          </div>
        </div>
        <div className="container relative h-200 sm:h-256 pb-16">
          <ReactApexChart
            options={options}
            series={series}
            type={options.chart.type}
            height={options.chart.height}
          />
        </div>
      </Root>
    </ThemeProvider>
  );
}

export default memo(CoinChart);
