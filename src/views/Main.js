import React from "react";
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 가져옵니다.
import "../style/Main.scss";

export default function Main() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  }

  const handleLogin = () => {
    navigate('/login');
  };

  return (
<<<<<<< HEAD
    <div className="mainContainer">
      <div className="mainPage">
        <div className="mainsubdiv">
          <div className="maintitle">흥청망청 가계부</div>
          <div className="maincontent">소비 습관을 돌아보고 싶다면 시작해보세요</div>

          <div className="Button">
            <button className="mainbtn" type="button" onClick={handleSignUp}>
              회원가입
            </button>
            <button className="mainbtn" type="button" onClick={handleLogin}>
              로그인
            </button>
          </div>
        </div>
      </div>

      <div className="mainPage2">
        <div>
        <div className="maintitle2">흥청망청 가계부</div>
        <div className="maincontent2">소비 습관을 돌아보고 싶다면 시작해보세요</div>
        </div>
      </div>

      <div className="mainPage3">
        <p>asdfs</p>
      </div>
=======
    <div className="mainPage">
      <div className="a">
        <div className="maintitle">흥청망청 가계부</div>
        <div className="maincontent">소비 습관을 돌아보고 싶다면 시작해보세요</div>

        <div className="Button">
          <button className="mainbtn" type="button" onClick={handleSignUp}>
            회원가입
          </button>
          <button className="mainbtn" type="button" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </div>
>>>>>>> main
    </div>
  );
};