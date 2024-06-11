import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 가져옵니다.
import "../style/Main.scss";
import characterImg from "../views/public/character.png";
import chartImg from "../views/public/chart.png";
import planImg from "../views/public/plan.png";

export default function Main() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="mainContainer">
      <div className="mainPage">
        <div className="mainsubdiv">
          <div className="mainTextContainer">
            <div className="maintitle">흥청망청 가계부</div>
            <div className="maincontent">
              소비 습관을 돌아보고 싶다면 시작해보세요
            </div>

            {!isAuth && (
              <div className="Button">
                <button
                  className="mainbtn"
                  type="button"
                  onClick={handleSignUp}
                >
                  회원가입
                </button>
                <button className="mainbtn" type="button" onClick={handleLogin}>
                  로그인
                </button>
              </div>
            )}
          </div>
          <img src={characterImg} alt="Character" className="characterImage" />
        </div>
      </div>

      <div className="mainPage2">
        <div className="mainsubdiv">
          <img src={planImg} alt="Char" className="chartImage" />
          <div className="mainTextContainer">
            <div className="mainTitle2">
              <p>두 가지 플랜으로</p>
              <p>효과적인 관리를 해보세요</p>
            </div>
            <div className="maincontent">
              <p>자유로운 소비, 계획적인 소비 두 가지 플랜이 제공됩니다</p>
              <div className="Subcontent">
                <p>자유로운 소비 - 소비한 금액이 집계되는 형식</p>
                <p>
                  계획적인 소비 - 예산 설정 후 예산에서 소비 금액이 차감되어
                  가는 형식
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mainPage3">
        <div className="mainsubdiv">
          <div className="mainTextContainer">
            <div className="mainTitle2">한 눈에 보는 소비 내역</div>
            <div className="maincontent">
              그래프로 소비 내역을 돌아볼 수 있어요.
            </div>
          </div>
          <img src={chartImg} alt="Char" className="chartImage" />
        </div>
      </div>
    </div>
  );
}
