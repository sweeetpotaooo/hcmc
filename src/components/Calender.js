import React, { useState } from 'react';
import "../style/Calender.scss";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const data = {
    '2024-05-01': { income: 100, expense: 50 },
    '2024-05-02': { income: 200, expense: 30 },
    // 추가적인 날짜 데이터
  };

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const monthDays = getMonthDays(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // 빈 요소 추가
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let i = 1; i <= monthDays; i++) {
      const day = String(i).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;
      const income = data[dateKey]?.income || 0;
      const expense = data[dateKey]?.expense || 0;

      if (income === 0 && expense === 0) {
        days.push(
          <div key={i} className="day">
            <div className="date">{i}</div>
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day">
            <div className="date">{i}</div>
            {income !== 0 && <div className="income">₩{income}</div>}
            {expense !== 0 && <div className="expense">₩{expense}</div>}
          </div>
        );
      }
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="calender">
      <div className="header">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <div>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</div>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-of-week">{day}</div>
        ))}
      </div>
      <div className="days">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
