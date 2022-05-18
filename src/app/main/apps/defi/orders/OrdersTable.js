import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseUtils from "@fuse/utils";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
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
import OrdersStatus from "../order/OrdersStatus";
import { selectOrders, getOrders } from "../store/ordersSlice";
import OrdersTableHead from "./OrdersTableHead";
import { Grid } from "@mui/material";

function OrdersTable(props) {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const searchText = useSelector(
    ({ eCommerceApp }) => eCommerceApp.orders.searchText
  );

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(orders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [order, setOrder] = useState({
    direction: "asc",
    rank: null,
  });

  // console.log(data[0]);

  // data.map((da) => {
  //   console.log(da.name);
  // });

  useEffect(() => {
    dispatch(getOrders()).then((res) => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(FuseUtils.filterArrayByString(orders, searchText));
      setPage(0);
    } else {
      setData(orders);
    }
  }, [orders, searchText]);

  function handleRequestSort(event, property) {
    const rank = property;
    let direction = "desc";

    if (order.rank === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      rank,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.rank));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    // props.navigate(`/assets/price/${item.gecko_id}`);
    props.navigate(
      `/defi/protocols/${item.name.replace(/\s/g, "-").toLowerCase()}`
    );
    // console.log(item.name.replace(/\s/g, "-").toLowerCase());
  }

  function handleCheck(event, rank) {
    const selectedIndex = selected.indexOf(rank);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rank);
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
          There are no orders!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <OrdersTableHead
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
                  switch (order.rank) {
                    case "rank": {
                      return parseInt(o.rank, 100);
                    }
                    case "category": {
                      return o.name;
                    }
                    case "change24h": {
                      return o.market_cap_change_24h;
                    }
                    case "marketcap": {
                      return o.market_cap;
                    }
                    default: {
                      return o[order.rank];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.rank) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.rank}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                      align="left"
                    ></TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n.rank}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <Grid container>
                        <span>
                          <img
                            loading="lazy"
                            width="18"
                            height="18"
                            src={n.logo}
                            alt={n.name}
                          />
                        </span>
                        <Typography style={{ marginLeft: 2 }}>
                          {n.name} ({n.symbol})
                        </Typography>
                      </Grid>
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {/* <span>$</span>{n.floorPriceUSD.toLocaleString()} */}
                      {n.chain}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n.category}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <span>$</span>
                      {n.tvl.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.change_1h < 0 ? (
                        <span className="text-red-600">
                          %{parseFloat(n.change_1h).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-green-600">
                          %{parseFloat(n.change_1h).toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.change_1d < 0 ? (
                        <span className="text-red-600">
                          %{parseFloat(n.change_1d).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-green-600">
                          %{parseFloat(n.change_1d).toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.change_7d < 0 ? (
                        <span className="text-red-600">
                          %{parseFloat(n.change_7d).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-green-600">
                          %{parseFloat(n.change_7d).toFixed(2)}
                        </span>
                      )}
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
        count={data.length}
        rowsPerPage={rowsPerPage}
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

export default withRouter(OrdersTable);
