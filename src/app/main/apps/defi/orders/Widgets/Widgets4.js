import _ from "@lodash";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

function Widgets4(props) {
  // const theme = useTheme();
  // const [serie, setSerie] = useState("Today");
  // const data = _.merge({}, props.data);

  // _.setWith(data, "options.theme.monochrome.color", theme.palette.primary.main);

  return (
    <Card className="w-full rounded-20 shadow p-20">
      <div className="pb-24">
        <Typography className="h1 font-medium">TVL Breakdown</Typography>
      </div>

      <div className="h-256 relative">
        <Chart
          options={props.options}
          series={props.series}
          type="pie"
          width="380"
        />
      </div>
    </Card>
  );
}

export default memo(Widgets4);
