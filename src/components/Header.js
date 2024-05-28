import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../style/Header.scss';
import { logOutUser } from '../redux/user';

const Header = () => {
  const isLoggedIn = useSelector((state) => Boolean(state.user.data.token.atk));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.user.data.token.atk);

  const handleLogout = async () => {
    try {
      await dispatch(logOutUser({ userToken }));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="logo">흥청망청</div>
      <div className="auth-nav">
        {isLoggedIn && (
          <div className="nav-buttons">
            <Link to="/myplan">
              <button className="plan-button">내플랜 보기</button>
            </Link>
            <Link to="/plan">
              <button className="plan-button">플랜추가</button>
            </Link>
          </div>
        )}
        <div className="auth" onClick={handleAuthClick}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </div>
      </div>
    </header>
  );
};

export default Header;
