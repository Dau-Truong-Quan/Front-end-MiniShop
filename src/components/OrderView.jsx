import React from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ListItemIcon } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import numberWithCommas from "../utils/numberWithCommas";
import image from "../assets/images/products/chuaCoDonHang.png";
import { message } from "antd";
import { render } from "@testing-library/react";
const OrderView = (props) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList.value);
  const [listOrder, setListOrder] = React.useState(null);
  let idOrder = props.status;

  React.useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .get(`http://localhost:8080/api/order/user2/${loginData.dataLogin.id}`, {
        params: {
          statusId: idOrder,
        },
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setListOrder(response.data);
      })
      .catch((eror) => {});
  }, []);

  const handleChangeStatus = (idStatus, orderId) => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .request({
        method: "PUT",
        url: `http://localhost:8080/api/order/${orderId}`,
        params: {
          statusId: idStatus,
        },
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        axios
          .get(
            `http://localhost:8080/api/order/user2/${loginData.dataLogin.id}`,
            {
              params: {
                statusId: idOrder,
              },
              headers: {
                Authorization: "Bearer " + loginData.dataLogin.accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response);
            setListOrder(response.data);
          })
          .catch((eror) => {});
        message.success("Thành công");
      })
      .catch((error) => {
        message.error("thất bại");
      });
  };

  const renderButton = (status, orderId) => {
    if (status == 1 || status == 0) {
      return (
        <button
          className="stardust-button vg-cf0 "
          onClick={() => {
            handleChangeStatus(2, orderId);
          }}
        >
          Yêu cầu hủy
        </button>
      );
    } else if (status == 0 || status == 3) {
      return (
        <button
          className="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB"
          onClick={() => {
            handleChangeStatus(4, orderId);
          }}
        >
          Đã nhận hàng
        </button>
      );
    } else if (status == 0 || status == 4 || status == 5) {
      return (
        <button className="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB">
          Mua lại
        </button>
      );
    }
  };

  console.log(listOrder);

  return (
    <>
      {listOrder?.length < 1 ? (
        <>
          <img src={image} alt="" />
        </>
      ) : (
        listOrder?.map((item, index) => (
          <div key={index}>
            <div className="order__view">
              <div className="order__view__header">
                <ListItemIcon>
                  <DirectionsCarIcon fontSize="small" />
                </ListItemIcon>
                <span>{item.statusId.description}</span>
              </div>
              {item?.orderDetails?.map((itemOrder, index) => (
                <div key={index}>
                  <div className="border__seapare"></div>
                  <div className="order__view__body">
                    <div className="order__view__body__image">
                      <img
                        src={
                          `http://localhost:8080/products/` +
                          itemOrder.product.image
                        }
                        alt=""
                      />
                    </div>
                    <div className="order__view__body__content">
                      <div>{itemOrder.product.name}</div>
                      <div>
                        Phân loại hàng : {itemOrder.product.category.name}
                      </div>
                      <div className="order__view__body__content__quality">
                        x {itemOrder.quantity}
                      </div>
                    </div>
                    <div className="order__view__body__price">
                      <div className="order__view__body__price__old">
                        {itemOrder.product.discount > 0 ? (
                          <del>{itemOrder.price}</del>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="order__view__body__price__new">
                        {numberWithCommas(
                          (itemOrder.price *
                            (100 - itemOrder.product.discount)) /
                            100
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="order__view__footer">
                <div className="border__seapare"></div>
                <div className="order__view__footer__totalprice">
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <span>
                    Tổng tiền:{" "}
                    <span>
                      {item?.orderDetails?.reduce(
                        (total, items) =>
                          total +
                          (Number(items.quantity) *
                            (items.price * (100 - items.product.discount))) /
                            100,
                        0
                      )}
                    </span>
                  </span>
                </div>

                <div className="order__view__footer__button">
                  {renderButton(item.statusId.statusId, item.orderId)}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default withRouter(OrderView);
