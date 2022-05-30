import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import CartPayment from "../components/CartPayment";
import { Order } from "../model/Order";

function Payment() {
  const cartItems = useSelector((state) => state.cartItems.value);

  const [chooseAddress, setChooseAddress] = useState(false);

  const addOrder = () => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    let order = new Order(null, null, "let go", 1123, null, null);
    axios
      .post(`http://localhost:8080/api/order${loginData.dataLogin.id}`, {
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
        data: {
          order,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <div className="payment">
        <div className="header__payment">
          <div className="payment_address">
            <div className="payment_address_content">
              <div className="_9VHkyQ">
                <svg
                  height="16"
                  viewBox="0 0 12 16"
                  width="12"
                  className="shopee-svg-icon icon-location-marker"
                >
                  <path
                    d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <div>Địa chỉ nhận hàng</div>
            </div>
            {chooseAddress ? (
              <div className="payment_address_add">
                {" "}
                <button className="stardust-button vg-cf0">
                  <svg
                    enableBackground="new 0 0 10 10"
                    viewBox="0 0 10 10"
                    role="img"
                    className="stardust-icon stardust-icon-plus-sign _5qwP-1"
                  >
                    <path
                      stroke="none"
                      d="m10 4.5h-4.5v-4.5h-1v4.5h-4.5v1h4.5v4.5h1v-4.5h4.5z"
                    />
                  </svg>
                  Thêm địa chỉ mới
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          {chooseAddress ? (
            <div>
              <div className="payment_address_choose">
                <label className="container">
                  <div className="Y3QA5S">
                    <div className="_3yvPt8">Trường Quân (+84) 364296143</div>
                    <div className="iXqine">
                      97 man thiện, Phường Hiệp Phú, Thành Phố Thủ Đức, TP. Hồ
                      Chí Minh
                    </div>
                  </div>
                  <input type="radio" defaultChecked="checked" name="radio" />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="payment_address_choose">
                <label className="container">
                  <div className="Y3QA5S">
                    <div className="_3yvPt8">Trường Quân (+84) 935856530</div>
                    <div className="iXqine">22 hiep hung dak lak</div>
                  </div>
                  <input type="radio" name="radio" />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="payment_address_groupbutton">
                <button
                  className="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB"
                  onClick={() => {
                    addOrder();
                  }}
                >
                  Hoàn thành
                </button>
                <button
                  onClick={() => setChooseAddress(false)}
                  className="stardust-button vg-cf0"
                >
                  Trở lại
                </button>
              </div>
            </div>
          ) : (
            <div className="payment_address_choose">
              <div className="Y3QA5S">
                <div className="_3yvPt8">Trường Quân (+84) 364296143</div>
                <div className="iXqine">
                  97 man thiện, Phường Hiệp Phú, Thành Phố Thủ Đức, TP. Hồ Chí
                  Minh
                </div>
              </div>
              <div
                onClick={() => setChooseAddress(true)}
                className="payment_change"
              >
                Thay đổi
              </div>
            </div>
          )}
        </div>
        <div>
          {/* header list */}
          <div className="list__item">
            <div className="header__list">
              <div className="HTDM2R">Sản phẩm</div>
              <div className="HTDM2R obwca8"></div>
              <div className="HTDM2R">Đơn giá</div>
              <div className="HTDM2R HTDM2R_qualiti">Số lượng</div>
              <div className="HTDM2R">Thành tiền</div>
            </div>
          </div>

          <div className="cart__payment__list">
            {cartItems.map((item, index) => (
              <CartPayment item={item} key={index} />
            ))}
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
              <button
                className="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB"
                onClick={() => {
                  addOrder();
                }}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
