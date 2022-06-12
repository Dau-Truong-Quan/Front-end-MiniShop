import { Rating } from "@mui/material";
import { message } from "antd";
import axios from "axios";

import BasicRating from "../BasicRating";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";

import numberWithCommas from "../../utils/numberWithCommas";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
const Feedback = (props) => {
  let loginData = JSON.parse(localStorage.getItem("login"));
  const [open, setOpen] = React.useState(false);
  let product = props.product;
  const [comment, setComment] = React.useState("");
  const [listFeedback, setListFeedback] = React.useState(null);
  const [value, setValue] = React.useState(0);
  console.log(loginData);
  let commented = null;
  commented = listFeedback?.filter(
    (e) => e.user.id === loginData?.dataLogin.id
  );
  console.log(commented);
  const handleClickOpen = () => {
    if (commented != null) {
      setComment(commented[0].comment);
      setValue(commented[0].vote);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/feedbacks`, {
        params: {
          productId: product.productId,
        },
      })
      .then((response) => {
        setListFeedback(response.data);
      })
      .catch((eror) => {
        message.error("lỗi lấy dữ liệu feedback");
      });
  }, [product]);

  const handleAddFeedback = () => {
    axios
      .request({
        method: "POST",
        url: `http://localhost:8080/api/feedbacks`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
        data: {
          feedbackId: {
            userId: loginData.dataLogin.id,
            idProduct: product.productId,
          },
          comment: comment,
          vote: value,
        },
      })
      .then((response) => {
        axios
          .get(`http://localhost:8080/api/feedbacks`, {
            params: {
              productId: product.productId,
            },
          })
          .then((response) => {
            setListFeedback(response.data);
          })
          .catch((eror) => {
            message.error("lỗi lấy dữ liệu");
          });
        message.success("Bình luận thành công");
      });

    setOpen(false);
  };

  return (
    <div className="feedback">
      <Dialog
        fullWidth={"xs"}
        maxWidth={"xs"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Đánh Giá Sản Phẩm</DialogTitle>
        <DialogContent>
          <Rating
            name="simple-controlled"
            value={value}
            size="large"
            sx={{
              fontSize: "6rem",
            }}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <DialogContent>
            {value <= 1 ? (
              <SentimentVeryDissatisfiedIcon
                size="large"
                color="warning"
                sx={{
                  fontSize: "6rem",
                  marginLeft: 15,
                }}
              />
            ) : value == 2 ? (
              <SentimentDissatisfiedIcon
                size="large"
                color="warning"
                sx={{
                  fontSize: "6rem",
                  marginLeft: 15,
                }}
              />
            ) : value == 3 ? (
              <SentimentSatisfiedIcon
                size="large"
                color="warning"
                sx={{
                  fontSize: "6rem",
                  marginLeft: 15,
                }}
              />
            ) : value == 4 ? (
              <SentimentSatisfiedAltIcon
                size="large"
                color="warning"
                sx={{
                  fontSize: "6rem",
                  marginLeft: 15,
                }}
              />
            ) : (
              <SentimentVerySatisfiedIcon
                size="large"
                color="warning"
                sx={{
                  fontSize: "6rem",
                  marginLeft: 15,
                }}
              />
            )}
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={comment}
              id="commented"
              label="Nhập đánh giá ở đây"
              type="input"
              fullWidth={true}
              variant="standard"
              onChange={(event) => setComment(event.target.value)}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Thoát</Button>
          <Button onClick={handleAddFeedback}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <div className="feedback__vote">
        <div>
          <h3>ĐÁNH GIÁ SẢN PHẨM</h3>
        </div>
        {loginData != null ? (
          <button
            onClick={handleClickOpen}
            className="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB"
          >
            {commented?.length == 0 ? "Đánh giá" : "Sửa đánh giá"}
          </button>
        ) : (
          <></>
        )}
      </div>

      <div className="feedback__header">
        <div className="feedback__header__left">
          <div>
            <span className="feedback__header__left__textL">
              {listFeedback?.length > 0
                ? listFeedback?.reduce((total, item) => total + item.vote, 0) /
                  listFeedback?.length
                : ""}
            </span>
            <span className="feedback__header__left__textR">
              {listFeedback?.length > 0 ? " trên 5" : "Chưa có đánh giá"}
            </span>
          </div>
          <div>
            <Rating
              name="read-only"
              value={
                listFeedback?.reduce((total, item) => total + item.vote, 0) /
                listFeedback?.length
              }
              readOnly
            />
          </div>
        </div>
        <div className="feedback__header__right">
          <button className="stardust-button vg-cf0">Tất cả</button>
          <button className="stardust-button vg-cf0">
            5 Sao (
            {listFeedback?.reduce(
              (total, item) => (item.vote == 5 ? total + 1 : total + 0),
              0
            )}
            )
          </button>
          <button className="stardust-button vg-cf0">
            4 Sao (
            {listFeedback?.reduce(
              (total, item) => (item.vote == 4 ? total + 1 : total + 0),
              0
            )}
            )
          </button>
          <button className="stardust-button vg-cf0">
            3 Sao (
            {listFeedback?.reduce(
              (total, item) => (item.vote == 3 ? total + 1 : total + 0),
              0
            )}
            )
          </button>
          <button className="stardust-button vg-cf0">
            2 Sao (
            {listFeedback?.reduce(
              (total, item) => (item.vote == 2 ? total + 1 : total + 0),
              0
            )}
            )
          </button>
          <button className="stardust-button vg-cf0">
            1 Sao (
            {listFeedback?.reduce(
              (total, item) => (item.vote == 1 ? total + 1 : total + 0),
              0
            )}
            )
          </button>
        </div>
      </div>

      {listFeedback?.map((item, index) => {
        return (
          <div className="feedback__body" key={index}>
            <div className="feedback__body__avata">
              <img
                className="img__show"
                src={`http://localhost:8080/users/` + item.user.image}
                alt=""
              />
            </div>

            <div className="feedback__body__content">
              <div>{item.user.firstName + " " + item.user.lastName}</div>
              <div>
                <Rating name="read-only" value={item.vote} readOnly />
              </div>
              <div>{item.date}</div>
              <div>{item.comment}</div>
            </div>
            <div className="feedback__body__border__seapare"></div>
          </div>
        );
      })}
    </div>
  );
};

export default Feedback;
