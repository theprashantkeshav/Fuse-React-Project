import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import ReactApexChart from "react-apexcharts";
import _ from "@lodash";

function Widgets3(props) {
  const theme = useTheme();
  const data = _.merge({}, props.data);

  _.setWith(data, "options.colors", [theme.palette.secondary.main]);

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="p-20 pb-0">
        <Typography className="h1 font-medium">Description</Typography>

        <div className="flex flex-row flex-wrap items-center mt-12">
          <Typography className="h3 font-semibold leading-none tracking-tighter">
            {data.description.value}
          </Typography>
        </div>
      </div>
      <div className="h-96 w-100-p">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type={data.options.chart.type}
          height={data.options.chart.height}
        />
      </div>
    </Card>
  );
}

export default memo(Widgets3);
