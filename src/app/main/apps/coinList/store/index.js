import { combineReducers } from '@reduxjs/toolkit';
import coins from './coinsSlice';
import coinsList from './coinsListSlice';
import asset from './assetSlice';
import assetChart from './assetChartSlice';

const reducer = combineReducers({
  coins,
  coinsList,
  asset,
  assetChart,
});

export default reducer;
