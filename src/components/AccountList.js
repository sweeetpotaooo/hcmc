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
  TextField,
  Box,
  Button,
  Modal,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

// 모달창 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "date", label: "Date", minWidth: 110, align: "left" },
  { id: "title", label: "Title", minWidth: 110, align: "center" },
  { id: "category", label: "Category", minWidth: 100, align: "center" },
  // { id: "tag", label: "Tag", minWidth: 60, align: "right" },
  { id: "amount", label: "Amount", minWidth: 80, align: "right" },
];

const months = [
  { number: "01", name: "1월" },
  { number: "02", name: "2월" },
  { number: "03", name: "3월" },
  { number: "04", name: "4월" },
  { number: "05", name: "5월" },
  { number: "06", name: "6월" },
  { number: "07", name: "7월" },
  { number: "08", name: "8월" },
  { number: "09", name: "9월" },
  { number: "10", name: "10월" },
  { number: "11", name: "11월" },
  { number: "12", name: "12월" },
];

const AccountList = (props) => {
  const { totalIncome, totalExpense, monthFilter, tagFilter } = props;
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [expense, setExpense] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [income, setIncome] = useState(0);

  // 모달창 구현
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  // 모달창 리스트 데이터 수정
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/wallet/money/update/${selectedRow._id}`,
        selectedRow
      );
      const updatedRows = rows.map((row) =>
        row._id === selectedRow._id ? selectedRow : row
      );
      setRows(updatedRows);
      console.log(updatedRows);
      handleClose();
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 모달창 리스트 데이터 삭제
  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/wallet/money/delete/${selectedRow._id}`,
        selectedRow
      );
      handleClose();
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 리스트 데이터
  useEffect(() => {
    // Intl 시간형식 지정
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("en-CA", options);
    };

    // 리스트 데이터 불러오기
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

  // 지출, 수입 데이터 상태 체크
  useEffect(() => {
    let expense = 0;
    let income = 0;
    rows.forEach((item) => {
      if (item.tag === "지출") {
        expense += parseInt(item.amount);
      } else if (item.tag === "수입") {
        income += parseInt(item.amount);
      }
    });
    setExpense(expense);
    setIncome(income);
    totalExpense(expense);
    totalIncome(income);
  }, [rows, totalExpense, totalIncome]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            {months.map((month) => (
              <option key={month.number} value={month.number}>
                {month.name}
              </option>
            ))}
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    onClick={() => handleOpen(row)}
                  >
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
      <Modal
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
              <Button onClick={handleDelete} color="primary">
                Delete
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AccountList;
