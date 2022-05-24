/* eslint-disable prettier/prettier */
import withReducer from "app/store/withReducer";
import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";
import reducer from "../store";
import { getAsset } from "../store/assetSlice";
import ItemCard from "./assetComponent/ItemCard";
import Competition from "./assetComponent/Competition";
import CoinChart from "./assetComponent/CoinChart";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const CoinDetail = (props) => {
  const { assetId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (assetId) {
      dispatch(getAsset(assetId));
    }
  }, [assetId, dispatch]);

  const { asset } = useSelector(({ coinList }) => coinList);

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
  return (
    <div>
      <motion.div
        className="flex flex-col md:flex-row sm:p-8 container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-1 flex-col min-w-0 pt-16">
          {/* Asset Chart */}
          <motion.div variants={item} className="widget w-full p-16">
            <CoinChart
              assetId={assetId}
              assetName={asset?.name}
              symbol={asset?.symbol}
            />
          </motion.div>
          {/* Key metric title */}
          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-normal"
            color="textSecondary"
          >
            {asset?.name} Key Metrics
          </Typography>
          {/* First 4 cards div */}
          <div className="flex flex-col sm:flex sm:flex-row pb-4">
            {/* Price */}
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                title="Price"
                value={asset?.market_data.current_price.usd}
                bottom_value={asset?.market_data.price_change_percentage_24h}
                bottom_desc="(24h)"
              />
            </motion.div>
            {/* Volume (24h) Card */}
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                title="Market Cap"
                value={asset?.market_data.market_cap.usd}
                bottom_value={
                  asset?.market_data.market_cap_change_percentage_24h
                }
                bottom_desc="(24h)"
              />
            </motion.div>
            {/* Fully dilluted valuation */}
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                title="Fully Dilluted Valuation"
                value={asset?.market_data.fully_diluted_valuation.usd}
                bottom_desc="Current Price x Max Supply"
              />
            </motion.div>
            {/* Circulating Supply Card */}
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                title="Circulating Supply"
                value={asset?.market_data.circulating_supply}
                bottom_value={
                  (asset?.market_data.circulating_supply * 100) /
                  asset?.market_data.total_supply
                }
                bottom_desc="of total supply"
              />
            </motion.div>
            {/* Market Cap Card */}
            <motion.div variants={item} className="widget w-full sm:w-1/4 p-2">
              <ItemCard
                title="Volume(24h)"
                value={asset?.market_data.market_cap_change_24h}
                bottom_value={
                  asset?.market_data.market_cap_change_percentage_24h
                }
              />
            </motion.div>
          </div>
          {/* Second 4 cards div */}
          <div className="flex flex-col sm:flex sm:flex-row pb-4">
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                title="Rank"
                value={asset?.market_data.market_cap_rank}
                // bottom_value={asset?.market_data.price_change_percentage_24h}
                // bottom_desc="(24H)"
              />
            </motion.div>
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                title="Price change(1h)"
                value={
                  asset?.market_data.price_change_percentage_1h_in_currency.usd
                }
              />
            </motion.div>
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                title="Price change(24h)"
                value={
                  asset?.market_data.price_change_percentage_24h_in_currency.usd
                }
              />
            </motion.div>
            <motion.div variants={item} className="widget w-full sm:w-1/4 p-2">
              <ItemCard
                title="Price change(7d)"
                value={
                  asset?.market_data.price_change_percentage_7d_in_currency.usd
                }
              />
            </motion.div>
          </div>
          {/* Third 4 cards div */}
          <div className="flex flex-col sm:flex sm:flex-row pb-4">
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                title="All Time High"
                value={asset?.market_data.ath.usd}
                bottom_value={asset?.market_data.ath_change_percentage.usd}
                //call timeago function here
                bottom_desc={asset?.market_data.ath_date.usd}
              />
            </motion.div>
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard title="Coingecko Rank" value={asset?.coingecko_rank} />
            </motion.div>
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/4 p-2"
            >
              <ItemCard
                ss={1}
                title="Circulating Supply"
                value={asset?.market_data.circulating_supply}
                bottom_value={
                  (asset?.market_data.circulating_supply * 100) /
                  asset?.market_data.total_supply
                }
                bottom_desc="of total supply"
              />
            </motion.div>
            <motion.div variants={item} className="widget w-full sm:w-1/4 p-2">
              <ItemCard
                title="Market Cap"
                value={asset?.market_data.market_cap.usd}
                bottom_value={
                  (asset?.market_data.circulating_supply * 100) /
                  asset?.market_data.total_supply
                }
                bottom_desc="of crypto market"
              />
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex sm:flex-row pb-1">
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/1 p-2"
            >
              <ItemCard
                title="Return of Investment"
                value={
                  asset?.market_data.price_change_percentage_7d_in_currency.usd
                }
                bottom_value={
                  asset?.market_data.price_change_percentage_7d_in_currency.usd
                }
                bottom_desc="1 Week"
              />
              <ItemCard
                title="Return of Investment"
                value={
                  asset?.market_data.price_change_percentage_30d_in_currency.usd
                }
                bottom_value={
                  asset?.market_data.price_change_percentage_30d_in_currency.usd
                }
                bottom_desc="1 Month"
              />
              <ItemCard
                title="Return of Investment"
                value={
                  asset?.market_data.price_change_percentage_60d_in_currency.usd
                }
                bottom_value={
                  asset?.market_data.price_change_percentage_60d_in_currency.usd
                }
                bottom_desc="2 Months"
              />
              <ItemCard
                title="Return of Investment"
                value={
                  asset?.market_data.price_change_percentage_1y_in_currency.usd
                }
                bottom_value={
                  asset?.market_data.price_change_percentage_1y_in_currency.usd
                }
                bottom_desc="1 Year"
              />
            </motion.div>
          </div>

          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-normal"
            color="textSecondary"
          >
            What are your top devices?
          </Typography>
          <motion.div variants={item} className="widget w-full p-16">
            <Competition />
          </motion.div>
          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-normal"
            color="textSecondary"
          >
            What are your top devices?
          </Typography>
        </div>
        {/* <div className="flex flex-wrap w-full md:w-320 pt-16">
          <div className="mb-32 w-full sm:w-1/2 md:w-full">
            <Typography
              component={motion.div}
              variants={item}
              className="px-16 pb-8 text-18 font-normal"
              color="textSecondary"
            >
              What are your top devices?
            </Typography>

            <motion.div variants={item} className="widget w-full p-16">
              <Competition />
            </motion.div>
          </div>

          <div className="mb-32 w-full sm:w-1/2 md:w-full">
            <Typography
              component={motion.div}
              variants={item}
              className="px-16 pb-8 text-18 font-normal"
              color="textSecondary"
            >
              How are your sales?
            </Typography>

            <motion.div variants={item} className="widget w-full p-16">
              <Competition />
            </motion.div>
          </div>

          <div className="mb-32 w-full sm:w-1/2 md:w-full">
            <Typography
              component={motion.div}
              variants={item}
              className="px-16 pb-8 text-18 font-normal lg:pt-0"
              color="textSecondary"
            >
              What are your top campaign?
            </Typography>
            <motion.div variants={item} className="widget w-full p-16">
              <Competition />
            </motion.div>
          </div>
        </div> */}
      </motion.div>
    </div>
  );
};

export default withReducer("coinList", reducer)(memo(CoinDetail));
