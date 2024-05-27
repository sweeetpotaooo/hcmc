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
<<<<<<< HEAD
  Tooltip,
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
=======
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
>>>>>>> main

const columns = [
  { id: "date", label: "Date", minWidth: 110 },
  { id: "title", label: "Title", minWidth: 110 },
  { id: "category", label: "Category", minWidth: 100, align: "center" },
<<<<<<< HEAD
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
  const { totalIncome, totalExpense, monthFilter } = props;
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [expense, setExpense] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [income, setIncome] = useState(0);
  // 검색기능 구현
  const [input, setInput] = useState(null);
  const [searchList, setSearchList] = useState(null);
  // 모달창 구현
=======
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
>>>>>>> main
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
<<<<<<< HEAD
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
        `http://localhost:4000/wallet/money/update/${selectedRow._id}`,
        selectedRow
      );
      const updatedRows = rows.map((row) =>
        row._id === selectedRow._id ? selectedRow : row
      );
      setRows(updatedRows);
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

  // 리스트 데이터 useEffect()
  useEffect(() => {
    // Intl 시간형식 지정
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("en-CA", options);
    };

    // 리스트 데이터 불러오기
=======
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  };

  useEffect(() => {
>>>>>>> main
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
<<<<<<< HEAD
    fetchData();
  }, []);

  // 지출, 수입 데이터 상태 체크
=======

    fetchData();
  }, []);

>>>>>>> main
  useEffect(() => {
    let exp = 0;
    let inc = 0;
    rows.forEach((item) => {
      if (item.tag === "수입") {
<<<<<<< HEAD
        inc -= parseInt(item.amount);
=======
        inc += parseInt(item.amount);
>>>>>>> main
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

<<<<<<< HEAD
  // 검색기능 구현
  const handleSearch = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const onClickSearh = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost/4000/wallet/${input}`,
        input
      );
      setSearchList(response.row);
      console.log(response.data);
=======
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
>>>>>>> main
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="AccountList">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Typography sx={{ flex: "1 1 100%" }} id="tableTitle" component="div">
<<<<<<< HEAD
          <Tooltip title="Search list">
            <Button onClick={onClickSearh} type="text" disabled={input === 0}>
              <Input onChange={handleSearch} type="text"></Input>
              <SearchIcon></SearchIcon>
            </Button>
=======
          <Tooltip title="Filter list">
            <IconButton onClick={tagFilter}>
              <FilterListIcon />
            </IconButton>
>>>>>>> main
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
<<<<<<< HEAD
            {months.map((month) => (
              <option key={month.number} value={month.number}>
                {month.name}
              </option>
            ))}
=======
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
>>>>>>> main
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
              .slice(
                (page && page >= 0 ? page : 0) *
                  (rowsPerPage && rowsPerPage > 0 ? rowsPerPage : 10),
                (page && page >= 0 ? page : 0) *
                  (rowsPerPage && rowsPerPage > 0 ? rowsPerPage : 10) +
                  (rowsPerPage && rowsPerPage > 0 ? rowsPerPage : 10)
              )
              .map((row) => {
                return (
<<<<<<< HEAD
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    onClick={() => handleOpen(row)}
                  >
=======
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id} onClick={() => handleOpen(row)}>
>>>>>>> main
                    {columns.map((column) => {
                      const value = row[column.id];
                      let displayValue = value;
                      let style = {};

                      if (column.id === "amount") {
<<<<<<< HEAD
                        if (row.tag == "지출") {
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
=======
                        displayValue = `-${value}`;
                        style.color = "red";
                      }
        
                      return (
                        <TableCell key={column.id} align={column.align} style={style}>
>>>>>>> main
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
<<<<<<< HEAD
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
=======
>>>>>>> main
    </div>
  );
};

<<<<<<< HEAD
export default AccountList;
=======
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
>>>>>>> main
