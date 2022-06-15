import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CartPayment from "../components/CartPayment";
import { Order } from "../model/Order";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import numberWithCommas from "../utils/numberWithCommas";
import { removeAllItem } from "../redux/shopping-cart/cartItemsSlide";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
function Payment() {
  const cartItems = useSelector((state) => state.cartItems.value);
  let list = [];
  const [listaddress, setListaddress] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [province, setProvince] = React.useState("");
  const [listProvince, setListProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [listDistrict, setListDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");
  const [listWard, setListWard] = React.useState("");
  const dispatch = useDispatch();
  const [wardAdd, setWardAdd] = React.useState("");
  const [indexChoose, setIndexChoose] = React.useState(0);
  const [indexChooseOld, setIndexChooseOld] = React.useState(0);
  const history = useHistory();
  const [address, setAddress] = React.useState("");
  const handleChangeProvince = (event) => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    setProvince(event.target.value);

    axios
      .request({
        method: "GET",
        url: `http://localhost:8080/api/address/district/${
          event.target.value * 1 + 1
        }`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setListDistrict(response.data);
      });
  };

  const handleChooseAddress = (index) => {
    setIndexChooseOld(indexChoose);
    setIndexChoose(index);
  };

  const handleChangeDistrict = (event) => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    setDistrict(event.target.value);
    console.log(event.target.value);
    axios
      .request({
        method: "GET",
        url: `http://localhost:8080/api/address/ward/${
          event.target.value * 1 + 1
        }`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setListWard(response.data);
      })
      .catch((error) => {});
  };
  const handleChangeWard = (event) => {
    setWard(event.target.value);
    let loginData = JSON.parse(localStorage.getItem("login"));

    setWardAdd(listWard[event.target.value * 1]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddressOder = () => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .request({
        method: "POST",
        url: `http://localhost:8080/api/address/address/${loginData.dataLogin.id}`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
        data: {
          specificAddress: address,
          ward: wardAdd,
        },
      })
      .then((response) => {
        axios
          .get(
            `http://localhost:8080/api/address/address/${loginData.dataLogin.id}`,
            {
              headers: {
                Authorization: "Bearer " + loginData.dataLogin.accessToken,
              },
            }
          )
          .then((response) => {
            // setListaddress(response.data)
            response.data.map((item, index) => {
              list = [...list, item.specificAddress];
            });
            setListaddress(response.data);
          })
          .catch((eror) => {});
      });

    setOpen(false);
  };

  const [chooseAddress, setChooseAddress] = React.useState(false);
  React.useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .get(
        `http://localhost:8080/api/address/address/${loginData.dataLogin.id}`,
        {
          headers: {
            Authorization: "Bearer " + loginData.dataLogin.accessToken,
          },
        }
      )
      .then((response) => {
        // setListaddress(response.data)
        response.data.map((item, index) => {
          list = [...list, item.specificAddress];
        });
        setListaddress(response.data);
      })
      .catch((eror) => {});

    axios
      .get(`http://localhost:8080/api/address/province`, {
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setListProvince(response.data);
      })
      .catch((eror) => {});
  }, []);

  const addOrder = () => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .request({
        method: "POST",
        url: `http://localhost:8080/api/order/add/${loginData.dataLogin.id}`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
        data: {
          address:
            listaddress &&
            listaddress.length &&
            listaddress[indexChoose].specificAddress +
              "," +
              listaddress[indexChoose].ward.wardName +
              "," +
              listaddress[indexChoose].ward.district.districtName +
              "," +
              listaddress[indexChoose].ward.district.province.provinceName,
          totalPrice: cartItems.reduce(
            (total, item) => total + Number(item.quantity) * Number(item.price),
            0
          ),
        },
      })
      .then((response) => {
        dispatch(removeAllItem());
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        history.push("/account");
      });
  };

  return (
    <Container maxWidth="false">
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
              <div>
                {listaddress?.length > 0
                  ? " Địa chỉ nhận hàng"
                  : "Chưa có địa chỉ"}
              </div>
            </div>
            {chooseAddress ? (
              <div className="payment_address_add">
                <button
                  className="stardust-button vg-cf0"
                  onClick={handleClickOpen}
                >
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
                <Dialog
                  fullWidth={"xs"}
                  maxWidth={"xs"}
                  open={open}
                  onClose={handleClose}
                >
                  <DialogTitle>Thêm địa chỉ mới</DialogTitle>
                  <DialogContent>
                    <DialogContent>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth={true}>
                          <InputLabel id="demo-simple-select-label">
                            Province
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={province}
                            label="Province"
                            onChange={handleChangeProvince}
                          >
                            {listProvince &&
                              listProvince.length &&
                              listProvince.map((item, index) => {
                                return (
                                  <MenuItem value={index}>
                                    {item.provinceName}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>

                    <DialogContent>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth={true}>
                          <InputLabel id="demo-simple-select-label">
                            District
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={district}
                            label="District"
                            onChange={handleChangeDistrict}
                          >
                            {listDistrict &&
                              listDistrict.length &&
                              listDistrict.map((item, index) => {
                                return (
                                  <MenuItem value={index}>
                                    {item.districtName}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>
                    <DialogContent>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth={true}>
                          <InputLabel id="demo-simple-select-label">
                            Ward
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ward}
                            label="Ward"
                            onChange={handleChangeWard}
                          >
                            {listWard &&
                              listWard.length &&
                              listWard.map((item, index) => {
                                return (
                                  <MenuItem value={index}>
                                    {item.wardName}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>

                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Địa chỉ cụ thể"
                        type="input"
                        fullWidth={true}
                        variant="standard"
                        onChange={(event) => setAddress(event.target.value)}
                      />
                    </DialogContent>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <Button onClick={handleAddressOder}>Xác nhận</Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              <></>
            )}
          </div>
          {chooseAddress ? (
            <div>
              {listaddress &&
                listaddress.length > 0 &&
                listaddress.map((item, index) => {
                  return (
                    <div className="payment_address_choose" key={index}>
                      <label className="container">
                        <div className="Y3QA5S">
                          <div className="_3yvPt8">
                            {item.user.firstName + " - " + item.user.phone}
                          </div>
                          <div className="iXqine">
                            {item.specificAddress +
                              "," +
                              item.ward.wardName +
                              "," +
                              item.ward.district.districtName +
                              "," +
                              item.ward.district.province.provinceName}
                          </div>
                        </div>
                        <input
                          type="radio"
                          defaultChecked={
                            indexChoose === index ? "checked" : ""
                          }
                          name="radio"
                          onClick={() => handleChooseAddress(index)}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  );
                })}
              <div className="payment_address_groupbutton">
                <button
                  className="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB"
                  onClick={() => {
                    setChooseAddress(false);
                  }}
                >
                  Hoàn thành
                </button>
                <button
                  onClick={() => {
                    setChooseAddress(false);
                    setIndexChoose(indexChooseOld);
                  }}
                  className="stardust-button vg-cf0"
                >
                  Trở lại
                </button>
              </div>
            </div>
          ) : (
            <div className="payment_address_choose">
              <div className="Y3QA5S">
                <div className="_3yvPt8">
                  {listaddress &&
                    listaddress.length > 0 &&
                    listaddress[indexChoose].user.firstName +
                      " - " +
                      listaddress[indexChoose].user.phone}
                </div>
                <div className="iXqine">
                  {listaddress &&
                    listaddress.length > 0 &&
                    listaddress[indexChoose].specificAddress +
                      "," +
                      listaddress[indexChoose].ward.wardName +
                      "," +
                      listaddress[indexChoose].ward.district.districtName +
                      "," +
                      listaddress[indexChoose].ward.district.province
                        .provinceName}
                </div>
              </div>
              <div
                onClick={() => setChooseAddress(true)}
                className="payment_change"
              >
                {listaddress?.length > 0 ? "Thay đổi" : "Thêm địa chỉ"}
              </div>
            </div>
          )}
        </div>
        <div>
          {/* header list */}
          <div className="list__item">
            <div className="header__list">
              <div className="HTDM2R">Sản phẩm</div>

              <div className="HTDM2R HTDM2R_price">Đơn giá</div>

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
            <div className="lhwDvd Uu2y3K c5Dezq">
              {numberWithCommas(
                cartItems.reduce(
                  (total, item) =>
                    total + Number(item.quantity) * Number(item.price),
                  0
                )
              )}
            </div>
            <div className="lhwDvd Exv9ow B6k-vE">Phí vận chuyển</div>
            <div className="lhwDvd Uu2y3K B6k-vE">₫0</div>
            <div className="lhwDvd Exv9ow A4gPS6">Tổng thanh toán:</div>
            <div className="lhwDvd +0tdvp Uu2y3K A4gPS6">
              {numberWithCommas(
                cartItems.reduce(
                  (total, item) =>
                    total + Number(item.quantity) * Number(item.price),
                  0
                )
              )}
            </div>
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
    </Container>
  );
}

export default Payment;
