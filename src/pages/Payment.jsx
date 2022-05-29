import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartPayment from "../components/CartPayment";

function Payment() {
  const cartItems = useSelector((state) => state.cartItems.value);
  return (
    <div>
      <div class="payment">
        <div class="header__payment">
          <div class="payment_address">
            <div class="payment_address_content">
              <div class="_9VHkyQ">
                <svg
                  height="16"
                  viewBox="0 0 12 16"
                  width="12"
                  class="shopee-svg-icon icon-location-marker"
                >
                  <path
                    d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>Địa chỉ nhận hàng</div>
            </div>
          </div>
          <div class="payment_address_choose">
            <div class="Y3QA5S">
              <div class="_3yvPt8">Trường Quân (+84) 364296143</div>
              <div class="iXqine">
                97 man thiện, Phường Hiệp Phú, Thành Phố Thủ Đức, TP. Hồ Chí
                Minh
              </div>
            </div>
            <div class="payment_change">Thay đổi</div>
          </div>
        </div>
        <div>
          {/* header list */}
          <div className="list__item">
            <div className="header__list">
              <div className="HTDM2R">Sản phẩm</div>
              <div className="HTDM2R obwca8"></div>
              <div className="HTDM2R">Đơn giá</div>
              <div className="HTDM2R">Số lượng</div>
              <div className="HTDM2R">Thành tiền</div>
            </div>
          </div>

          <div className="cart__payment__list">
            {cartItems.map((item, index) => (
              <CartPayment item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
