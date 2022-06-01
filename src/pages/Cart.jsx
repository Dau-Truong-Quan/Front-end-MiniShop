import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.value);

  React.useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));

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
    </Helmet>
  );
};

export default Cart;
