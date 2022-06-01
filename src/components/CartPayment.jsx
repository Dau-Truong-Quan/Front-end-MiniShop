import React, { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../redux/shopping-cart/cartItemsSlide";

import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";

const CartPayment = (props) => {
  const dispatch = useDispatch();

  const itemRef = useRef(null);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);

    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (opt) => {
    if (opt === "+") {
      dispatch(updateItem({ ...item, quantity: quantity + 1 }));
    }
    if (opt === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 })
      );
    }
  };

  // const updateCartItem = () => {
  //     dispatch(updateItem({...item, quantity: quantity}))
  // }

  const removeCartItem = () => {
    console.log("removeCartItem");
    dispatch(removeItem(item));
  };
  return (
    <>
      <div className="cart__payment__item" ref={itemRef}>
        <div className="cart__payment__item__image">
          <img src={`http://localhost:8080/products/` + item.image} alt="" />
        </div>
        <div className="cart__payment__item__info">
          <div className="cart__payment__item__info__name">
            <Link to={`/catalog/${item.productId}`}>{`${item.name}`}</Link>
          </div>
          <div className="cart__payment__item__info__price">
            {numberWithCommas(item.price)}
          </div>
          <div className="cart__payment__item__info__quantity">
            <div className="">
              <div className="">{quantity}</div>
            </div>
          </div>
          <div className="cart__payment__item__info__price__total">
            {numberWithCommas(item.price * quantity)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPayment;
