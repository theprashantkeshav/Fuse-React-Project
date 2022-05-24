/* eslint-disable prettier/prettier */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

export const getAssetChart = createAsyncThunk(
  "coinList/getAssetChart",
  async (param) => {
    console.log("id=", param.assetId, param.day, param.interval);
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${param.assetId}/market_chart?vs_currency=usd&days=${param.day}&interval=${param.interval}`
    );
    const data = await response.data;
    return data;
  }
);

const assetChartSlice = createSlice({
  name: "coinList/assetChart",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getAssetChart.fulfilled]: (state, action) => action.payload,
  },
});

export default assetChartSlice.reducer;
