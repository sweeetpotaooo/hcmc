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

  // ObjectId 추출 후 백엔드로 보내기
  const handleRowClick = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/wallet/money/${id}`,
        { id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      handleDeleteWindow(id);
    } catch (err) {
      console.error(err);
    }
  };

  // 삭제 window 띄우기
  const handleDeleteWindow = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      handleDeleteClick(id);
    }
  };
  // 선택한 데이터 삭제
  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/wallet/money/delete/${id}`
      );
      console.log(response.data);
      window.location.reload();
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
                  // _id: ObjectId이기 때문에 이걸 클릭하면 ObjectId가 눌려지도록 하기
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    onClick={() => handleRowClick(row._id)}
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
    </div>
  );
};

export default AccountList;
