import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../redux/shopping-cart/cartItemsSlide";

import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const itemRef = useRef(null);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);

    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (opt) => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (opt === "+") {
      axios
        .request({
          method: "PUT",
          url: `http://localhost:8080/api/cart`,
          headers: {
            Authorization: "Bearer " + loginData.dataLogin.accessToken,
          },
          data: {
            productId: item.productId,
            userId: loginData.dataLogin.id,
            quantity: item.quantity + 1,
          },
        })
        .then((response) => {
          dispatch(updateItem({ ...item, quantity: quantity + 1 }));
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    }
    if (opt === "-") {
      axios
        .request({
          method: "PUT",
          url: `http://localhost:8080/api/cart`,
          headers: {
            Authorization: "Bearer " + loginData.dataLogin.accessToken,
          },
          data: {
            productId: item.productId,
            userId: loginData.dataLogin.id,
            quantity: item.quantity - 1 === 0 ? 1 : item.quantity - 1,
          },
        })
        .then((response) => {
          dispatch(updateItem({ ...item, quantity: quantity + 1 }));
          dispatch(
            updateItem({
              ...item,
              quantity: quantity - 1 === 0 ? 1 : quantity - 1,
            })
          );
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    }
  };

  // const updateCartItem = () => {
  //     dispatch(updateItem({...item, quantity: quantity}))
  // }

  const removeCartItem = () => {
    dispatch(removeItem(item));
  };

  return (
    <div className="cart__item" ref={itemRef}>
      <div className="cart__item__image">
        <img src={`http://localhost:8080/products/` + item.image} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/catalog/${item.productId}`}>{`${item.name}`}</Link>
        </div>
        <div className="cart__item__info__price">
          {numberWithCommas(item.price)}
        </div>
        <div className="cart__item__info__quantity">
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("-")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("+")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__del">
          <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
