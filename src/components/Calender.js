// src/Calendar.js
import React, { useState } from 'react';
import "../style/Calender.scss";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const days = [];
    const monthDays = getMonthDays(currentDate);
    for (let i = 1; i <= monthDays; i++) {
      days.push(<div key={i} className="day">{i}</div>);
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
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <div>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</div>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>
      <div className="days">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
