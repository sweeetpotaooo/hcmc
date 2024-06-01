import React, { useEffect, useRef, useState } from "react";
import AccountArea from "../components/AccountArea2";
import AccountInsert from "../components/AccountInsert2";
import AccountList from "../components/AccountList2";
import AccountTempleat from "../components/AccountTempleat2";
import Chart from "../components/Chart2";
import ChartArea from "../components/ChartArea2";
import VerticalBarChart from "../components/VerticalBarChart2";
import PlannedPlanName from "../components/PlannedPlanName";
import Calender from "../components/Calender2";
import GenderCard from "../components/GenderCard2";
import AgeCard from "../components/AgeCard2";
import UnivCard from "../components/UnivCard2";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../style/Swiper.scss";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";

function PlannedView() {
  const [orgRows, setOrgRows] = useState([]);
  const { id } = useParams();
  const [rows, setRows] = useState(orgRows);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  //const [count, setCount] = useState(0);

  useEffect(() => {
    setRows(orgRows);
  }, [orgRows]);

  const nextId = useRef(3);
  const insertRowHandler = (row) => {
    const newRow = {
      id: nextId.current,
      date: row[0],
      title: row[1],
      category: row[2],
      //tag: row[3],
      amount: row[3],
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

  // const changeTagHandler = () => {
  //   setCount(count + 1);
  //   console.log(count);
  //   let newRows = [];
  //   if (count % 3 === 1) {
  //     newRows = orgRows.filter((prevState) => prevState.tag !== "지출");
  //     setRows(newRows);
  //   } else {
  //     setRows(orgRows);
  //   }
  // };

  return (
    <>
      <AccountTempleat>
        <AccountArea>
          <PlannedPlanName planId={id} />
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

        <AccountArea>
          <ChartArea
            totalExpense={expense}
            totalIncome={income}
            orgRows={orgRows}
          />
          <Calender />

          <SwiperComponent
            slidesPerView={1}
            spaceBetween={5}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Chart />
            </SwiperSlide>
            <SwiperSlide>
              <GenderCard />
            </SwiperSlide>
            <SwiperSlide>
              <AgeCard />
            </SwiperSlide>
            <SwiperSlide>
              <UnivCard />
            </SwiperSlide>
          </SwiperComponent>
        </AccountArea>
      </AccountTempleat>
    </>
  );
}

export default PlannedView;
