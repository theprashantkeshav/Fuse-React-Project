import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { Button } from '@mui/material';
import FuseUtils from '@fuse/utils';
import { useEffect, useState } from 'react';

import { setCoinsSearchText, getCoins } from './store/coinsSlice';
import {
  selectCoinsList,
  setFilterCoinList,
  onSearch,
} from './store/coinsListSlice';

function CoinListHeader100(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ coinList }) => coinList.coins.searchText);
  const mainTheme = useSelector(selectMainTheme);
  const coinsList = useSelector(selectCoinsList);
  const [coinsData, setCoinsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (searchText.length !== 0) {
      const filterCoins = FuseUtils.filterArrayByString(coinsList, searchText);
      dispatch(setFilterCoinList(filterCoins));
    } else {
      dispatch(setFilterCoinList([]));
    }
  }, [coinsList, searchText]);
  // eslint-disable-next-line consistent-return
  const handleSearch = () => {
    if (searchText.length !== 0) {
      // setCoinsData(FuseUtils.filterArrayByString(coinsList, searchText));
      const filterCoins = FuseUtils.filterArrayByString(coinsList, searchText);
      dispatch(getCoins(0, filterCoins)).then(() => setLoading(false));
      dispatch(onSearch(true));
    } else {
      dispatch(getCoins(0)).then(() => setLoading(false));
      dispatch(onSearch(false));
    }
  };
  // console.log('coinsdata==', coinsData);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">

        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-16 md:text-24 mx-12 font-semibold"
        >
          Top 100 Digital Assets
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder="Hit search button for the results"
              className="flex flex-1 mx-8"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                'aria-label': 'Search',
              }}
              onChange={(ev) => dispatch(setCoinsSearchText(ev))}
            />
            <Button
              className="shadow-2"
              onClick={handleSearch}
              color="secondary"
              variant="contained"
            >
              Search
            </Button>
          </Paper>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default CoinListHeader100;
