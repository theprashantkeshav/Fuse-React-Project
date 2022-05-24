import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAsset = createAsyncThunk(
  "coinList/getAsset",
  async (assetId) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${assetId}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=true`
    );
    const asset = await res.data;
    console.log("🚀 -> file: assetSlice.js -> line 15 -> asset", asset);

    return asset;
  }
);

const assetSlice = createSlice({
  name: "coinList/asset",
  initialState: null,

  extraReducers: {
    [getAsset.fulfilled]: (state, action) => action.payload,
  },
});

export default assetSlice.reducer;
