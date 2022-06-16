import * as React from "react";

import { Link, useLocation } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import logo from "../assets/images/LogoMiniShop.png";
import AccountMenu from "../pages/AccountMenu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addItem, removeAllItem } from "../redux/shopping-cart/cartItemsSlide";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const cartItems = useSelector((state) => state.cartItems.value);

  const headerRef = React.useRef(null);
  const [totalProducts, setTotalProducts] = React.useState(0);
  let loginData = JSON.parse(localStorage.getItem("login"));

  React.useEffect(() => {
    setTotalProducts(cartItems.reduce((total, item) => total + 1, 0));
  }, [cartItems]);
  React.useEffect(() => {
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

  const menuLeft = React.useRef(null);

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
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={totalProducts} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
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
