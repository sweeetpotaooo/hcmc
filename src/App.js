import { useEffect, useRef, useState } from "react";
import "./App.css";
import AccountArea from "./components/AccountArea";
import AccountInsert from "./components/AccountInsert";
import AccountList from "./components/AccountList";
import AccountTempleat from "./components/AccountTempleat";
import ChartArea from "./components/ChartArea";

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

  const [dataList, setDataList] = useState({
    food: 10000,
    goods: 0,
    edu: 12000,
    etc: 0,
    save: 0,
  });

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

    if (newRow.category === "식비") {
      setDataList((prev) => ({
        ...prev,
        food: (dataList.food += newRow.amount),
      }));
    } else if (newRow.category === "생필품") {
      setDataList((prev) => ({
        ...prev,
        goods: dataList.goods + newRow.amount,
      }));
    } else if (newRow.category === "문화/교육비") {
      setDataList((prev) => ({
        ...prev,
        edu: (dataList.edu += newRow.amount),
      }));
    } else if (newRow.category === "기타") {
      setDataList((prev) => ({
        ...prev,
        etc: (dataList.etc += newRow.amount),
      }));
    } else if (newRow.category === "저축") {
      setDataList((prev) => ({
        ...prev,
        save: (dataList.save += newRow.amount),
      }));
    }

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
    let newRows = orgRows.filter(
      (prevState) => prevState.date.slice(5, 7) === e.target.value
    );

    if (Array.isArray(newRows) && newRows.length == 0) {
      console.log("데이터 없음");
    }
    setRows(newRows);
  };

  const [count, setCount] = useState(0);

  const changeTagHandler = () => {
    setCount(count + 1);
    console.log(count);
    let newRows = [];
    if (count % 3 === 0) {
      newRows = orgRows.filter((item) => item.tag !== "수입");
      setRows(newRows);
    } else if (count % 3 === 1) {
      newRows = orgRows.filter((prevState) => prevState.tag !== "지출");
      setRows(newRows);
    } else {
      setRows(orgRows);
    }
  };

  return (
    <AccountTempleat>
      <ChartArea
        totalExpense={expense}
        totalIncome={income}
        dataList={dataList}
      />
      <AccountArea>
        <AccountInsert insertRow={insertRowHandler} />
        <AccountList
          rows={rows}
          totalIncome={totalIncomeHandler}
          totalExpense={totalExpenseHandler}
          monthFilter={changeMonthHandler}
          tagFilter={changeTagHandler}
        />
      </AccountArea>
    </AccountTempleat>
  );
}

export default App;
