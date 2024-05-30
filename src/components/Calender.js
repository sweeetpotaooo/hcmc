import React, { useState, useEffect } from 'react';
import "../style/Calender.scss"; // 파일명은 "Calendar.scss"로 맞춰야 합니다
import axios from 'axios';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/wallet/money");
        const rawData = response.data;
        const processedData = {};

        rawData.forEach(item => {
          const dateKey = item.date.split('T')[0];
          if (!processedData[dateKey]) {
            processedData[dateKey] = { income: 0, expense: 0 };
          }

          if (item.tag === "수입") {
            processedData[dateKey].income += item.amount;
          } else if (item.tag === "지출") {
            processedData[dateKey].expense += item.amount;
          }
        });

        setData(processedData);
        setLoading(false);
      } catch (error) {
        setError('데이터를 가져오는데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      days.push(
        <div key={i} className="day">
          <div className="date">{i}</div>
          {income !== 0 && <div className="income">₩{income.toLocaleString()}</div>}
          {expense !== 0 && <div className="expense">₩{expense.toLocaleString()}</div>}
        </div>
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="calender">
      <div className="calenderDiv">
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
    </div>
  );
};

export default Calendar;
