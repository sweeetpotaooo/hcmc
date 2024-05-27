import React, { useEffect, useRef, useState } from "react";
import AccountArea from "../components/AccountArea";
import AccountInsert from "../components/AccountInsert";
import AccountList from "../components/AccountList";
import AccountTempleat from "../components/AccountTempleat";
import ChartArea from "../components/ChartArea";
import VerticalBarChart from "../components/VerticalBarChart";
import Header from "../components/Hearder";
import PlanName from "../components/PlanName";
import Calender from "../components/Calender";

function HomeView() {
  const [orgRows, setOrgRows] = useState([]);
  const [rows, setRows] = useState(orgRows);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

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

  function totalIncomeHandler(data) {
    setIncome(data);
  }
  function totalExpenseHandler(data) {
    setExpense(data);
  }

  const changeMonthHandler = (e) => {
    let newRows = orgRows.filter(
      (prevState) => prevState.date.slice(5, 7) === e.target.value
    );

    if (Array.isArray(newRows) && newRows.length === 0) {
      console.log("데이터 없음");
    }
    setRows(newRows);
  };

  return (
    <>
      <Header />
        <AccountTempleat>
          <AccountArea>
            <PlanName />
            <AccountInsert insertRow={insertRowHandler} />
            <AccountList
              rows={rows}
              totalIncome={totalIncomeHandler}
              totalExpense={totalExpenseHandler}
              monthFilter={changeMonthHandler}
              //tagFilter={changeTagHandler}
            />
            <VerticalBarChart orgRows={rows} />
          </AccountArea>
          <ChartArea
            totalExpense={expense}
            totalIncome={income}
            //dataList={dataList}
            orgRows={orgRows}
          />
          <Calender/>
        </AccountTempleat>
    </>
  );
}

export default HomeView;
