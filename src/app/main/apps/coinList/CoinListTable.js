/* eslint-disable prettier/prettier */
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import { Grid } from "@mui/material";
import { selectCoins, getCoins } from "./store/coinsSlice";
import CoinListTableHead from "./CoinListTableHead";
import { getCoinsList, selectCoinsList } from "./store/coinsListSlice";

function CoinListTable(props) {
  const dispatch = useDispatch();
  const orders = useSelector(selectCoins);
  const coinsList = useSelector(selectCoinsList);

  const searchText = useSelector(
    ({ coinList }) => coinList.coinsList.searchText
  );
  const { filterCoinList, search } = useSelector(
    ({ coinList }) => coinList.coinsList
  );

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(orders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  useEffect(() => {
    dispatch(getCoinsList()).then(() => {
      dispatch(getCoins(page)).then(() => setLoading(false));
    });
  }, [dispatch, page]);

  useEffect(() => {
    setData(orders);
  }, [orders, searchText]);
  useEffect(() => {
    setPage(0);
  }, [search]);
  function handleRequestSort(event, property) {
    console.log("property=", property);
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/assets/price/${item.id}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          We couldnt find that asset :(
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CoinListTableHead
            selectedOrderIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />
          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case "id": {
                      return o.market_cap_rank;
                    }
                    case "coin_name": {
                      return o.name.toUpperCase();
                    }
                    case "symbol": {
                      return o.symbol;
                    }
                    case "price": {
                      return o.current_price;
                    }
                    case "1h": {
                      return o.price_change_percentage_1h_in_currency;
                    }
                    case "24h": {
                      return o.price_change_percentage_24h_in_currency;
                    }
                    case "7d": {
                      return o.price_change_percentage_7d_in_currency;
                    }
                    case "24volume": {
                      return o.total_volume;
                    }
                    case "mkt": {
                      return o.market_cap;
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(0, search ? 50 : rowsPerPage)
              .map((n, index) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    ></TableCell>
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      {n.market_cap_rank}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <Grid container>
                        <span>
                          <img
                            loading="lazy"
                            width="18"
                            height="18"
                            src={n.image}
                            alt={n.name}
                          />
                        </span>
                        <Typography style={{ marginLeft: 2 }}>
                          {n.name}
                        </Typography>
                      </Grid>
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.symbol.toUpperCase()}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <span>$</span>
                      {n.current_price?.toLocaleString()}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                      style={{
                        color:
                          n.price_change_percentage_1h_in_currency > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {Math.round(
                        n.price_change_percentage_1h_in_currency * 10
                      ) / 10}
                      %
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      align="right"
                      scope="row"
                      style={{
                        color:
                          n.price_change_percentage_24h_in_currency > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {Math.round(
                        n.price_change_percentage_24h_in_currency * 10
                      ) / 10}
                      %
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                      style={{
                        color:
                          n.price_change_percentage_7d_in_currency > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {/* <OrdersStatus name={n.status[0].name} /> */}
                      {Math.round(
                        n.price_change_percentage_7d_in_currency * 10
                      ) / 10}
                      %
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <span>$</span>
                      {n.total_volume?.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <span>$</span>
                      {n.market_cap?.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      <img
                        loading="lazy"
                        width="135"
                        height="50"
                        alt={`${n.name} 7d chart`}
                        src={`https://www.coingecko.com/coins/${
                          n.image.split("/")[5]
                        }/sparkline`}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={
          filterCoinList.length > 0 ? filterCoinList.length : coinsList.length
        }
        rowsPerPage={search ? 50 : rowsPerPage}
        // labelRowsPerPage={<Typography>Assets per page</Typography>}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(CoinListTable);
