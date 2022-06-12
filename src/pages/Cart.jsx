import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import ButtonCustom from "../components/ButtonCustom";

import productData from "../assets/fake-data/products";
import numberWithCommas from "../utils/numberWithCommas";
import axios from "axios";
import {
  addItem,
  removeAllItem,
  setItem,
} from "../redux/shopping-cart/cartItemsSlide";

const Cart = () => {
  const history = useHistory();
  let loginData = JSON.parse(localStorage.getItem("login"));
  console.log(loginData);
  if (loginData == null) {
    window.location.href = "/login";
  }
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.value);

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart`, {
        params: {
          userId: loginData.dataLogin.id,
        },
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        dispatch(removeAllItem());
        response.data.map((item, index) => {
          let newItem = {
            cartId: item.cartId,
            productId: item.product.productId,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
          };

          dispatch(addItem(newItem));
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      })
      .catch((eror) => {
        console.log("no");
      });
  }, []);

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);

  return (
    <Helmet title="Giỏ hàng">
      {totalProducts == 0 ? (
        <div className="noItem">
          <div>
            <img
              src={`https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png`}
              alt=""
            />
          </div>
          <div>Giỏ hàng của bạn còn trống</div>
          <div className="noItem__button">
            <Link to="/catalog">
              <ButtonCustom size="block">Mua ngay</ButtonCustom>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart">
          <div className="cart__info">
            <div className="cart__info__txt">
              <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
              <div className="cart__info__txt__price">
                <span>Thành tiền:</span>{" "}
                <span>{numberWithCommas(Number(totalPrice))}</span>
              </div>
            </div>
            <div className="cart__info__btn">
              <Link to="/payment">
                <ButtonCustom size="block">Đặt hàng</ButtonCustom>
              </Link>

              <Link to="/catalog">
                <ButtonCustom size="block">Tiếp tục mua hàng</ButtonCustom>
              </Link>
            </div>
          </div>
          <div className="cart__list">
            {cartItems.map((item, index) => (
              <CartItem item={item} key={index} />
            ))}
          </div>
        </div>
      )}
    </Helmet>
  );
};

export default Cart;
