import { useRef, useState } from "react";
import "./App.css";
import AccountArea from "./components/AccountArea";
import AccountInsert from "./components/AccountInsert";
import AccountList from "./components/AccountList";
import AccountTempleat from "./components/AccountTempleat";

function App() {
  const [rows, setRows] = useState([
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

  const nextId = useRef(4);
  const insertRowHandler = (row) => {
    const newRow = {
      id: nextId.current,
      date: row[0],
      title: row[1],
      category: row[2],
      tag: "지출",
      amount: row[3],
    };

    setRows((prevState) => [newRow, ...prevState]);
    ++nextId.current;
  };

  return (
    <AccountTempleat>
      <AccountArea>
        <AccountInsert insertRow={insertRowHandler} />
        <AccountList rows={rows} />
      </AccountArea>
    </AccountTempleat>
  );
}

export default App;
