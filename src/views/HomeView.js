import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AccountArea from "../components/AccountArea";
import AccountInsert from "../components/AccountInsert";
import AccountList from "../components/AccountList";
import AccountTempleat from "../components/AccountTempleat";
import Chart from "../components/Chart";
import ChartArea from "../components/ChartArea";
import VerticalBarChart from "../components/VerticalBarChart";
import FreePlanName from "../components/FreePlanName";
import Calender from "../components/Calender";
import GenderCard from "../components/GenderCard";
import AgeCard from "../components/AgeCard";
import UnivCard from "../components/UnivCard";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../style/Swiper.scss";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function HomeView() {
  const { id } = useParams();
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
      <AccountTempleat>
        <AccountArea>
          <FreePlanName planId={id} />

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
            //dataList={dataList}
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

export default HomeView;
