import React from "react";
import "../style/SignUp.scss";
import { useForm } from "react-hook-form";
import { registerUser } from "../redux/thunkFunctions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = ({ id, password, birth, gender, univ }) => {
    const body = {
      id,
      password,
      birth,
      gender,
      univ,
    };
    dispatch(registerUser(body)).unwrap();
    reset();
    navigate("/login");
  };

  const userId = {
    required: "필수 필드입니다.",
  };
  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자입니다.",
    },
  };
  const userBirth = {
    required: "필수 필드입니다.",
  };
  const userGender = {
    required: "필수 필드입니다.",
  };
  const userUniv = {
    required: "필수 필드입니다.",
  };

  return (
    <div className="wrapper">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" name="id" {...register("id", userId)} />
            {errors?.id && (
              <div>
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", userPassword)}
            />
            {errors?.password && (
              <div>
                <span>{errors.password.message}</span>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="birth">생년월일</label>
            <input
              type="date"
              id="birth"
              name="birth"
              {...register("birth", userBirth)}
            />
            {errors.birth && (
              <div>
                <span>{errors.birth.message}</span>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="gender">성별</label>
            <select
              id="gender"
              name="gender"
              {...register("gender", userGender)}
            >
              {errors.email && (
                <div>
                  <span>{errors.gender.message}</span>
                </div>
              )}
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
          <div>
            <label htmlFor="univ">소속 대학교</label>
            <input
              type="text"
              id="univ"
              name="univ"
              {...register("univ", userUniv)}
            />
            {errors?.univ && (
              <div>
                <span>{errors.univ.message}</span>
              </div>
            )}
          </div>
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
