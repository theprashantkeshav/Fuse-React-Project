import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';

const rows = [
  {
    id: 'id',
    align: 'right',
    disablePadding: true,
    label: '#',
    sort: true,
  },
  {
    id: 'coin_name',
    align: 'left',
    disablePadding: false,
    label: 'Asset',
    sort: true,
  },
  {
    id: 'symbol',
    align: 'right',
    disablePadding: false,
    label: 'Symbol',
    sort: true,
  },
  {
    id: 'price',
    align: 'right',
    disablePadding: false,
    label: 'Price',
    sort: true,
  },
  {
    id: '1h',
    align: 'right',
    disablePadding: false,
    label: '1h',
    sort: true,
  },
  {
    id: '24h',
    align: 'right',
    disablePadding: false,
    label: '24h',
    sort: true,
  },
  {
    id: '7d',
    align: 'right',
    disablePadding: false,
    label: '7d',
    sort: true,
  },
  {
    id: '24volume',
    align: 'right',
    disablePadding: false,
    label: '24h Volume',
    sort: true,
  },
  {
    id: 'mkt',
    align: 'right',
    disablePadding: false,
    label: 'Mkt Cap',
    sort: true,
  },
  {
    id: 'last7days',
    align: 'center',
    disablePadding: false,
    label: 'Last 7 Days',
    sort: false,
  },
];

function OrdersTableHead(props) {
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
      <TableCell padding="none" className="w-40 md:w-64 text-center z-99">

</TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort ? (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === 'right' ? 'bottom-end' : 'bottom-start'
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
              ) : (
                row.label
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default OrdersTableHead;
