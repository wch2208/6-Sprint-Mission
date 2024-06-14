import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import logo from "../../assets/logo-panda.svg";
import { useAuth } from "../../contexts/AuthContext";
import LoginIcon from "../../assets/icon-login.svg";

// 현재 경로를 불리언으로 반환하는 커스텀훅
const usePagePaths = () => {
  const { pathname } = useLocation();

  const isOnProductPage = pathname.startsWith("/products");
  const isOnLoginPage = pathname.startsWith("/login");
  const isOnSignUpPage = pathname.startsWith("/signup");

  return {
    isOnProductPage,
    isOnLoginPage,
    isOnSignUpPage,
  };
};

const Nav: React.FC = () => {
  const { pathname } = useLocation();
  const { isOnProductPage, isOnLoginPage, isOnSignUpPage } = usePagePaths();
  const { user } = useAuth();
  console.log("로그인: ", user);
  if (isOnLoginPage || isOnSignUpPage) {
    return null;
  }

  return (
    <header>
      <div className="nav-container">
        <div className="logo">
          <img src={logo} className="logo-icon" alt="로고" />
          <Link to="/" className="logo-title">
            판다마켓
          </Link>
        </div>
        <div className="nav-pages">
          <Link
            to="/freeboard"
            className={`board-btn ${pathname === "/freeboard" && "active"}`}
          >
            자유게시판
          </Link>
          <Link
            to="/items"
            className={`items-btn ${
              (pathname === "/additem" ||
                pathname === "/items" ||
                isOnProductPage) &&
              "active"
            }`}
          >
            중고마켓
          </Link>
        </div>
        {user ? (
          <img
            className="icon-login"
            src={LoginIcon}
            alt="로그인 아이콘"
            onClick={handleLogouClick}
          />
        ) : (
          <Link to="/login" className="btn login-btn">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Nav;
