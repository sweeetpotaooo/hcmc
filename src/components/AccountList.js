import React from "react";
import "../style/AccountList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const AccountList = (props) => {
  const { rows } = props;

  const columns = [
    { id: "date", label: "Date", minWidth: 120 },
    { id: "title", label: "Title", minWidth: 180 },
    {
      id: "category",
      label: "Category",
      minWidth: 80,
      align: "center",
    },
    {
      id: "tag",
      label: "Tag",
      minWidth: 100,
      align: "right",
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 100,
      align: "right",
    },
  ];

  // function createData(date, title, category, tag, amount) {
  //   return { date, title, category, tag, amount };
  // }

  // const rows = [
  //   createData("India", "IN", 1324171354, 3287263),
  //   createData("China", "CN", 1403500365, 9596961),
  //   createData("Italy", "IT", 60483973, 301340),
  // ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="AccountList">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          현재 총 지출 :
          {/* {rows.forEach((item) => (allAmount += item.price))} */}
          {/* <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip> */}
        </Typography>

        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AccountList;
