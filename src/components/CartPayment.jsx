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
    console.log(item);
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

      {/* body */}
      <div className="KqH1Px">
        <div className="lhwDvd Exv9ow c5Dezq">Tổng tiền hàng</div>
        <div className="lhwDvd Uu2y3K c5Dezq">₫664.100</div>
        <div className="lhwDvd Exv9ow B6k-vE">Phí vận chuyển</div>
        <div className="lhwDvd Uu2y3K B6k-vE">₫54.200</div>
        <div className="lhwDvd Exv9ow A4gPS6">Tổng thanh toán:</div>
        <div className="lhwDvd +0tdvp Uu2y3K A4gPS6">₫718.300</div>
        <div className="Ql2fz0">
          <div className="FXKjae">
            <div className="gLbpKW">Nhấn "Đặt hàng" để thanh toán</div>
          </div>
          <button className="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB">
            Đặt hàng
          </button>
        </div>
      </div>

      {/* <div class="KqH1Px">
        <div class="lhwDvd Exv9ow c5Dezq">Tổng tiền hàng</div>
        <div class="lhwDvd Uu2y3K c5Dezq">₫664.100</div>
        <div class="lhwDvd Exv9ow B6k-vE">Phí vận chuyển</div>
        <div class="lhwDvd Uu2y3K B6k-vE">₫54.200</div>
        <div class="lhwDvd Exv9ow A4gPS6">Tổng thanh toán:</div>
        <div class="lhwDvd +0tdvp Uu2y3K A4gPS6">₫718.300</div>
        <div class="Ql2fz0">
          <div class="FXKjae">
            <div class="gLbpKW">
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
              <a
                href="https://shopee.vn/legaldoc/policies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Điều khoản Shopee
              </a>
            </div>
          </div>
          <button class="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB">
            Đặt hàng
          </button>
        </div>
      </div> */}
    </>
  );
};

export default CartPayment;
