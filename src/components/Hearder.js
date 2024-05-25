import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../style/Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">흥청망청</div>
            <div className="auth-nav">
                <div className="nav-buttons">
                    <button className="plan-button">내플랜 보기</button>
                    <Link to="/plan">
                      <button className="plan-button">플랜추가</button>
                    </Link>
                </div>
                <div className="auth">
                    <Link to="/login">
                        <button className="auth-button">로그인</button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;