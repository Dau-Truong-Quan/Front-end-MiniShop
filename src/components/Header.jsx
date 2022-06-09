import React, { useEffect, useRef } from "react";

import { Link, useLocation } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import logo from "../assets/images/LogoMiniShop.png";
import AccountMenu from "../pages/AccountMenu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const menuLeft = useRef(null);
  let loginData = JSON.parse(localStorage.getItem("login"));

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <ListItemIcon>
                <SearchIcon fontSize="large" />
              </ListItemIcon>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <ListItemIcon>
                  <AddShoppingCartIcon fontSize="large" />
                </ListItemIcon>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              {loginData === null ? (
                <div className="header__menu__item header__menu__right__item__link">
                  <Link to="/login">
                    <span className="header__menu__item header__menu__right__item__link___login">
                      Đăng nhập
                    </span>
                  </Link>
                  <Link to="/register">
                    <span className="header__menu__item header__menu__right__item__link__register">
                      Đăng kí
                    </span>
                  </Link>
                </div>
              ) : (
                <AccountMenu />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
