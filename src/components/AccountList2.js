import React, { useEffect, useState } from "react";
import "../style/AccountList.scss";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const columns = [
  { id: "date", label: "Date", minWidth: 110 },
  { id: "title", label: "Title", minWidth: 110 },
  { id: "category", label: "Category", minWidth: 100, align: "center" },
  // { id: "tag", label: "Tag", minWidth: 60, align: "right" },
  { id: "amount", label: "Amount", minWidth: 80, align: "right" },
];

const AccountList = (props) => {
  const { totalIncome, totalExpense, monthFilter, tagFilter } = props;
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/wallet/money");
        const formattedData = response.data.map((item) => ({
          ...item,
          date: formatDate(item.date),
        }));
        setRows(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let exp = 0;
    let inc = 0;
    rows.forEach((item) => {
      if (item.tag === "수입") {
        inc += parseInt(item.amount);
      }
    });
    setExpense(exp);
    setIncome(inc);
    totalExpense(exp);
    totalIncome(inc);
  }, [rows, totalExpense, totalIncome]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/wallet/money/${selectedRow._id}`, selectedRow);
      const updatedRow = response.data;

      // 로컬 상태 업데이트
      const updatedRows = rows.map((row) =>
        row._id === updatedRow._id ? updatedRow : row
      );
      setRows(updatedRows);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="AccountList">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Typography sx={{ flex: "1 1 100%" }} id="tableTitle" component="div">
          <Tooltip title="Filter list">
            <IconButton onClick={tagFilter}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          <select
            className="monthFilter"
            placeholder="월"
            onChange={monthFilter}
            required
            defaultValue=""
          >
            <option value="" disabled>
              월별 필터
            </option>
            <option value="01">1월</option>
            <option value="02">2월</option>
            <option value="03">3월</option>
            <option value="04">4월</option>
            <option value="05">5월</option>
            <option value="06">6월</option>
            <option value="07">7월</option>
            <option value="08">8월</option>
            <option value="09">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id} onClick={() => handleOpen(row)}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      let displayValue = value;
                      let style = {};

                      if (column.id === "amount") {
                        displayValue = `-${value}`;
                        style.color = "red";
                      }
        
                      return (
                        <TableCell key={column.id} align={column.align} style={style}>
                          {displayValue}
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
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Row
          </Typography>
          {selectedRow && (
            <div>
              <TextField
                margin="normal"
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={selectedRow.date}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Title"
                name="title"
                value={selectedRow.title}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Category"
                name="category"
                value={selectedRow.category}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Amount"
                name="amount"
                value={selectedRow.amount}
                onChange={handleInputChange}
              />
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </div>
          )}
        </Box>
      </Modal> */}
    </div>
  );
};

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };


export default AccountList;
