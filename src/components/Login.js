import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/thunkFunctions";
import "../style/Login.scss";

// 컴포넌트 정의 및 상태 변수 설정
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = ({ id, password }) => {
    const body = { id, password };
    dispatch(loginUser(body)).unwrap();
    reset();
    navigate("/free");
  };

  const userId = {
    required: "필수 필드입니다.",
  };

  const userPassword = {
    required: "필수 필드입니다.",
    minLengh: {
      value: 6,
      message: "최소 6글자입니다.",
    },
  };

  return (
    <div>
      <div className="LoginPage">
        <div className="subdiv">
          <div className="title">Login</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contentTitle">
              <div className="inputtitle">아이디</div>
              <div className="inputWrite">
                <input
                  type="text"
                  className="input"
                  {...register("id", userId)}
                />
                {errors?.id && (
                  <div>
                    <span>{errors.id.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputtitle">비밀번호</div>
              <div className="inputWrite">
                <input
                  type="password"
                  className="input"
                  {...register("password", userPassword)}
                />
                {errors?.password && (
                  <div>
                    <span>{errors?.password.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="button">
              <button className="btn" type="submit">
                로그인
              </button>
            </div>
          </form>
          <p className="user">
            {""}아이디가 없다면?{""}
            <a href="/signup">회원가입</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
