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
  Typography,
  TextField,
  Box,
  Button,
  Modal,
  Select,
  MenuItem,
  FormLabel,
  Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// 모달창 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 3,
};

const columns = [
  { id: "date", label: "Date", minWidth: 110, align: "center" || undefined },
  { id: "title", label: "Title", minWidth: 110, align: "center" || undefined },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "center" || undefined,
  },
  { id: "amount", label: "Amount", minWidth: 80, align: "center" || undefined },
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

const AccountList2 = (props) => {
  const { totalExpense, monthFilter } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [, setExpense] = useState(0);
  const [, setIncome] = useState(0);
  // 검색기능 구현
  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  // 모달창 구현
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    window.location.reload(); // 모달창 닫을 시 자동으로 새로고침
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  // 모달창 리스트 데이터 수정
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/walletEntries/plannedwallet/update/${selectedRow._id}`,
        selectedRow
      );
      const updatedRows = selectedRow.map((filteredRows) =>
        filteredRows._id === selectedRow._id ? selectedRow : filteredRows
      );
      setFilteredRows(updatedRows);
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
        `http://localhost:4000/walletEntries/plannedwallet/delete/${selectedRow._id}`,
        selectedRow
      );
      handleClose();
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  };

  // 리스트 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/walletEntries/plannedwallet");
        const formattedData = response.data.map((item) => ({
          ...item,
          date: formatDate(item.date),
        }));
        setFilteredRows(formattedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // 지출, 수입 데이터 상태 체크
  useEffect(() => {
    let exp = 0;
    let inc = 0;
    filteredRows.forEach((item) => {
      if (item.tag === "지출") {
        exp -= parseInt(item.amount);  //예산값 받아오면 예산에서 마이너스 되도록
      }
    });
    setExpense(exp);
    setIncome(inc);
    totalExpense(exp);
  }, [filteredRows, totalExpense]);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // 엔터키 입력
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 검색기능 구현
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/walletEntries/plannedwallet/find/${searchInput}`
      );
      const formattedData = response.data.map((item) => ({
        ...item,
        date: formatDate(item.date),
      }));
      setFilteredRows(formattedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    monthFilter(e.target.value);
  };

  return (
    <Box className="AccountList">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Typography sx={{ flex: "1 1 100%" }} id="tableTitle" component="div">
          <Input
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="검색어를 입력하세요"
            onKeyDown={(e) => activeEnter(e)}
          />
          <Button>
            <SearchIcon />
          </Button>
          <Select
            sx={{ "& .MuiSelect-select": { padding: "5px" } }}
            className="monthFilter"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <MenuItem value="" disabled></MenuItem>
            {months.map((month) => (
              <MenuItem key={month.number} value={month.number}>
                {month.name}
              </MenuItem>
            ))}
          </Select>
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
            {filteredRows
              .slice(
                (page && page >= 0 ? page : 0) *
                  (rowsPerPage && rowsPerPage > 0 ? rowsPerPage : 10),
                (page && page >= 0 ? page : 0) *
                  (rowsPerPage && rowsPerPage > 0 ? rowsPerPage : 10) +
                  (rowsPerPage && rowsPerPage > 0 ? rowsPerPage : 10)
              )
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
                      let displayValue = value;
                      let style = {};

                      if (column.id === "amount") {
                        if (row.tag === "지출") {
                          displayValue = `-${value}`;
                          style.color = "red";
                        }
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={style}
                        >
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
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
          <Typography id="modal-modal-title" variant="h6" component="h2" />
          {selectedRow && (
            <FormLabel>
              <TextField
                margin="normal"
                fullWidth
                type="date"
                name="date"
                value={selectedRow.date}
                onChange={handleInputChange}
              />
              <Select
                margin="normal"
                fullWidth
                name="category"
                value={selectedRow.category}
                onChange={handleInputChange}
              >
                <MenuItem disabled>지출</MenuItem>
                <MenuItem value="식비">식비</MenuItem>
                <MenuItem value="생필품">생필품</MenuItem>
                <MenuItem value="문화/교육비">문화/교육비</MenuItem>
                <MenuItem value="기타">기타</MenuItem>
                <MenuItem value="저축">저축</MenuItem>
              </Select>
              <TextField
                margin="normal"
                fullWidth
                type="text"
                name="title"
                value={selectedRow.title}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                name="amount"
                value={selectedRow.amount}
                onChange={handleInputChange}
              />
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </FormLabel>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AccountList2;
