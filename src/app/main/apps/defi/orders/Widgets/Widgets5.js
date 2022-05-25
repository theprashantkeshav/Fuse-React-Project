import _ from "@lodash";
import { styled, ThemeProvider, useTheme, alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { memo, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { selectContrastMainTheme } from "app/store/fuse/settingsSlice";
import Box from "@mui/material/Box";
import axios from "axios";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
}));

function Widgets5(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(
    selectContrastMainTheme(theme.palette.primary.main)
  );
  const data = _.merge({}, props.data);

  const [tabValue, setTabValue] = useState(2);
  const series = props.data.series[Object.keys(data.series)[tabValue]];

  // console.log(chartData);

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
        </div>
        <div className="container relative h-200 sm:h-256 pb-16">
          <ReactApexChart
            options={data.options}
            series={series}
            type={data.options.chart.type}
            height={data.options.chart.height}
          />
        </div>
      </Root>
    </ThemeProvider>
  );
}

export default memo(Widgets5);
