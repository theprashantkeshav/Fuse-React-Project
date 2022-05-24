import _ from "@lodash";
import { styled, ThemeProvider, useTheme, alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { selectContrastMainTheme } from "app/store/fuse/settingsSlice";
import Box from "@mui/material/Box";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
}));

const widgets5 = {
  id: "widget0",
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
        data: [],
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
  },
};

function Widgets5(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(
    selectContrastMainTheme(theme.palette.primary.main)
  );
  const data = _.merge({}, widgets5);

  const [tabValue, setTabValue] = useState(2);
  const series = widgets5.series[Object.keys(data.series)[tabValue]];

  _.setWith(data, "options.fill.colors", [theme.palette.secondary.main]);
  _.setWith(data, "options.markers.colors", [theme.palette.secondary.main]);
  _.setWith(data, "options.stroke.colors", [
    theme.palette.primary.contrastText,
  ]);
  _.setWith(data, "options.markers.strokeColors", [
    theme.palette.primary.contrastText,
  ]);
  _.setWith(
    data,
    "options.grid.borderColor",
    alpha(theme.palette.primary.contrastText, 0.3)
  );

  return (
    <ThemeProvider theme={contrastTheme}>
      <Root>
        <div className="container relative p-16 sm:p-24 flex flex-col sm:flex-row justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col items-center sm:items-start mb-16 sm:mb-0">
              <Typography className="h2 font-semibold" color="textPrimary">
                Total TVL
              </Typography>
              <Typography className="h5 font-medium" color="textSecondary">
                TVL
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
              {Object.keys(widgets5.series).map((key) => (
                <Tab
                  key={key}
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 capitalize"
                  disableRipple
                  label={key}
                />
              ))}
            </Tabs>
          </div>
        </div>
        <div className="container relative h-200 sm:h-256 pb-16">
          <ReactApexChart
            options={widgets5.options}
            series={series}
            type={widgets5.options.chart.type}
            height={widgets5.options.chart.height}
          />
        </div>
      </Root>
    </ThemeProvider>
  );
}

export default memo(Widgets5);
