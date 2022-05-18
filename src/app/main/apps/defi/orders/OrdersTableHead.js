import Checkbox from "@mui/material/Checkbox";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import { removeOrders } from "../store/ordersSlice";

const rows = [
  {
    id: "rank",
    align: "left",
    disablePadding: false,
    label: "#",
    sort: true,
  },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "chain",
    align: "right",
    disablePadding: false,
    label: "Chain",
    sort: true,
  },
  {
    id: "category",
    align: "right",
    disablePadding: false,
    label: "Category",
    sort: true,
  },
  {
    id: "tvl",
    align: "left",
    disablePadding: false,
    label: "TVL",
    sort: true,
  },
  {
    id: "change_1h",
    align: "left",
    disablePadding: false,
    label: "Change (1h)",
    sort: true,
  },
  {
    id: "change_1d",
    align: "left",
    disablePadding: false,
    label: "Change (1D)",
    sort: true,
  },
  ,
  {
    id: "change_7d",
    align: "left",
    disablePadding: false,
    label: "Change (7D)",
    sort: true,
  },
];

function OrdersTableHead(props) {
  const { selectedOrderIds } = props;
  const numSelected = selectedOrderIds.length;

  const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedOrdersMenu(event) {
    setSelectedOrdersMenu(event.currentTarget);
  }

  function closeSelectedOrdersMenu() {
    setSelectedOrdersMenu(null);
  }

  // const {onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        ></TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default OrdersTableHead;
