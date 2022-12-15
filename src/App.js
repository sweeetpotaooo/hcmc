import { useEffect, useRef, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AccountArea from "./components/AccountArea";
import AccountInsert from "./components/AccountInsert";
import AccountList from "./components/AccountList";
import AccountTempleat from "./components/AccountTempleat";
import ChartArea from "./components/ChartArea";
import NotFound from "./components/NotFound";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Root from "./components/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      // Outlet 설정
      children: [
        { index: true, element: <AccountTempleat /> }, // index:true = path:"/" 둘 다 같은 뜻
        { path: "/page1", element: <Page1 /> }, // path로 경로를 요청하면 element의 컴포넌트를 보여줌
        { path: "/page2", element: <Page2 /> },
      ],
    },
  ]);

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
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [count, setCount] = useState(0);

  // 차트에 들어갈 데이터 초기화
  const [dataList, setDataList] = useState({
    food: 0,
    goods: 0,
    edu: 0,
    etc: 0,
    save: 0,
  });

  useEffect(() => {
    setDataList({
      food: 0,
      goods: 0,
      edu: 0,
      etc: 0,
      save: 0,
    });
  }, [rows]);

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
    // dataListHandler(newRow);
  };

  useEffect(() => {
    rows.map((item) => {
      if (item.category === "식비") {
        setDataList((prev) => ({
          ...prev,
          food: (dataList.food += item.amount),
        }));
      } else if (item.category === "생필품") {
        setDataList((prev) => ({
          ...prev,
          goods: dataList.goods + item.amount,
        }));
      } else if (item.category === "문화/교육비") {
        setDataList((prev) => ({
          ...prev,
          edu: (dataList.edu += item.amount),
        }));
      } else if (item.category === "기타") {
        setDataList((prev) => ({
          ...prev,
          etc: (dataList.etc += item.amount),
        }));
      } else if (item.category === "저축") {
        setDataList((prev) => ({
          ...prev,
          save: (dataList.save += item.amount),
        }));
      }
    });
  }, [rows]);

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
    <>
      {/* <RouterProvider router={router} /> */}
      <AccountTempleat>
        <ChartArea
          totalExpense={expense}
          totalIncome={income}
          dataList={dataList}
          orgRows={orgRows}
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
    </>
  );
}

export default App;
