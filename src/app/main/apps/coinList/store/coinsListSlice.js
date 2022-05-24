import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getCoinsList = createAsyncThunk(
  "coinList/getCoinsList",
  async () => {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    const coinslist = await res.data;
    console.log(
      "🚀 -> file: coinsListSlice.js -> line 13 -> coinslist",
      coinslist
    );

    return coinslist;
  }
);

const coinsListAdapter = createEntityAdapter({});

export const { selectAll: selectCoinsList, selectById: selectOrderById } =
  coinsListAdapter.getSelectors((state) => {
    return state.coinList.coinsList;
  });

const coinsListSlice = createSlice({
  name: "coinList/coinsList",
  initialState: coinsListAdapter.getInitialState({
    search: false,
    filterCoinList: [],
  }),
  reducers: {
    setFilterCoinList: {
      reducer: (state, action) => {
        state.filterCoinList = action.payload;
      },
      prepare: (filterCoins) => ({ payload: filterCoins }),
    },
    onSearch: {
      reducer: (state, action) => {
        state.search = action.payload;
      },
      prepare: (state) => ({ payload: state }),
    },
  },
  extraReducers: {
    [getCoinsList.fulfilled]: coinsListAdapter.setAll,
  },
});

export const { setFilterCoinList, onSearch } = coinsListSlice.actions;

export default coinsListSlice.reducer;
