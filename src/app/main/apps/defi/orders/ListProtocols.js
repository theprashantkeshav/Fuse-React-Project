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

const ListProtocols = ({ setSelected }) => {
  console.log(setSelected);
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

  const [chainData, setChainData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://api.llama.fi/chains`
        );
        setChainData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const chainName = chainData?.map((cd) => {
    return cd.name;
  });

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
          <Widgets5 />
          <motion.div
            className="flex flex-col md:flex-row sm:p-8 container"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-1 flex-col min-w-0 pt-16">
              <div className="flex flex-col sm:flex sm:flex-row pb-32">
                <motion.div variants={item} className="widget w-full p-16">
                  <Widgets6 />
                </motion.div>

                <motion.div variants={item} className="widget w-full p-16">
                  <Widgets7 />
                </motion.div>

                <motion.div variants={item} className="widget w-full p-16">
                  <Widgets8 />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div>
        {" "}
        <DropDown chainName={chainName} setSelected={setSelected} />
      </div>
    </div>
  );
};

export default ListProtocols;
