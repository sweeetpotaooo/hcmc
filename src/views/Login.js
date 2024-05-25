import React, { useState } from "react";
// react와 useState 훅을 임포트
// useState는 함수형 컴포넌트에서 상태를 관리하는데 사용됨
import { useNavigate } from "react-router-dom";
import "../style/Login.scss";

// 컴포넌트 정의 및 상태 변수 설정
export default function Login() {
  const navigate = useNavigate();
  // 함수 초기화 --> 페이지 이동 가능하도록 함

  const [id, setId] = useState("");
  // 사용자 id 입력값을 저장하기 위한 상태 변수 초기화
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //로그인 버튼 클릭 시 호출되는 함수
  const handleLoginClick = () => {
    let isValid = true; // 입력값의 유효성 확인하는 플래그 변수 초기화

    if (id.length < 6) {
      setIdError("아이디를 6자리 이상 입력해주세요");
      isValid = false;
    } else {
      setIdError("");
    }

    if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      navigate("/plan");
    }
    // 입력값이 유효하면 홈페이지로 이동
  };

  return (
    <div>
      <div className="LoginPage">
        <div className="subdiv">
          <div className="title">Login</div>

          <div className="contentTitle">
            <div className="inputtitle">Id</div>
            <div className="inputWrite">
              <input
                type="text"
                className="input"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>
          {idError && <div className="errMessage">{idError}</div>}

          <div className="contentTitle">
            <div className="inputtitle">PassWord</div>
            <div className="inputWrite">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {passwordError && <div className="errMessage">{passwordError}</div>}

          <div className="button">
            <button className="btn" type="button" onClick={handleLoginClick}>
              로그인
            </button>
          </div>

          <p className="user">
            아이디가 없다면?
            <a href="/signup">회원가입</a>
          </p>
        </div>
      </div>
   </div>
  );
}