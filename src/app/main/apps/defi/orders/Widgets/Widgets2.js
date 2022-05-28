import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import _ from "@lodash";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";

//?  CONVERT NUMBER TO THOUSAND(K), MILLION(M) AND BILLION(B)
function protocolTvl(labelValue) {
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

function Widgets2(props) {
  const theme = useTheme();
  // const data = _.merge({}, widgets2);

  const [loading, setLoading] = useState(true);
  const [tvlData, setTvlData] = useState([]);

  // console.log(tvlData);

  // _.setWith(data, "options.colors", [theme.palette.primary.main]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://api.llama.fi/tvl/${props.protocol}`
        );
        setTvlData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Card className="w-full rounded-30 shadow">
      <div className="p-20 pb-0">
        <Typography className="h1 font-medium">TVL</Typography>

        <div className="flex flex-row flex-wrap items-center mt-12">
          <Typography className="text-48 font-semibold leading-none tracking-tighter">
            ${protocolTvl(tvlData)}
          </Typography>
        </div>
      </div>
      <div className="h-96 w-100-p"></div>
    </Card>
  );
}

export default Widgets2;
