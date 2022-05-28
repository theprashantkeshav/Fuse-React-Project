import { Pending } from "@mui/icons-material";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getIndividualProtocol = createAsyncThunk(
  "protocol/getIndividualProtocol",
  (protocol) => {
    return axios
      .get(`https://api.llama.fi/protocol/${protocol}`)
      .then((response) => response.data);
  }
);

const ordersAdapter = createEntityAdapter({ selectId: (order) => order.rank });

export const { selectAll: selectOrders, selectById: selectOrderById } =
  ordersAdapter.getSelectors((state) => state.eCommerceApp.orders);

const initialState = {
  loading: true,
  data: [],
  error: "",
};

const individualProtocolSlice = createSlice({
  name: "protocol",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getIndividualProtocol.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIndividualProtocol.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getIndividualProtocol.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default individualProtocolSlice.reducer;
