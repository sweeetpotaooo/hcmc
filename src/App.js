import { useEffect, useRef, useState } from "react";
import "./App.css";
import AccountArea from "./components/AccountArea";
import AccountInsert from "./components/AccountInsert";
import AccountList from "./components/AccountList";
import AccountTempleat from "./components/AccountTempleat";
import ChartArea from "./components/ChartArea";
import TotalExpense from "./components/TotalExpense";
import TotalIncome from "./components/TotalIncome";

function App() {
  const [orgRows, setOrgRows] = useState([
    {
      id: 1,
      date: "2022-12-02",
      title: "점심",
      category: "식비",
      tag: "지출",
      amount: 8000,
    },
    {
      id: 2,
      date: "2022-12-02",
      title: "간식",
      category: "식비",
      tag: "지출",
      amount: 2000,
    },
    {
      id: 3,
      date: "2022-12-02",
      title: "영화",
      category: "문화/교육비",
      tag: "지출",
      amount: 12000,
    },
  ]);

  const [rows, setRows] = useState(orgRows);

  useEffect(() => {
    setRows(orgRows);
  }, [orgRows]);

  const nextId = useRef(4);
  const insertRowHandler = (row) => {
    const newRow = {
      id: nextId.current,
      date: row[0],
      title: row[1],
      category: row[2],
      tag: row[3],
      amount: row[4],
    };

    setOrgRows((prevState) => [newRow, ...prevState]);
    ++nextId.current;
  };

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  function totalIncomeHandler(data) {
    setIncome(data);
  }
  function totalExpenseHandler(data) {
    setExpense(data);
  }

  const changeMonthHandler = (e) => {
    const newRows = orgRows.filter(
      (prevState) => prevState.date.slice(5, 7) === e.target.value
    );

    if (Array.isArray(newRows) && newRows.length == 0) {
      console.log("데이터 없음");
    }
    setRows(newRows);
  };

  return (
    <AccountTempleat>
      <ChartArea>
        <TotalExpense totalExpense={expense} />
        <TotalIncome totalIncome={income} />
      </ChartArea>
      <AccountArea>
        <AccountInsert insertRow={insertRowHandler} />
        <AccountList
          rows={rows}
          totalIncome={totalIncomeHandler}
          totalExpense={totalExpenseHandler}
          monthFilter={changeMonthHandler}
        />
      </AccountArea>
    </AccountTempleat>
  );
}

export default App;
