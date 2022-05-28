import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import ReactApexChart from "react-apexcharts";
import _ from "@lodash";

function Widgets3(props) {
  return (
    <Card className="w-full rounded-20 shadow">
      <div className="p-20 pb-0">
        <Typography className="h1 font-medium">Description</Typography>

        <div className="flex flex-row flex-wrap items-center mt-12">
          <Typography className="h3 font-semibold leading-none tracking-tighter">
            {props.description}
          </Typography>
        </div>
      </div>
      <div className="h-96 w-100-p"></div>
    </Card>
  );
}

export default memo(Widgets3);
