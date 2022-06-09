import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemsSlide";
import { remove } from "../redux/product-modal/productModalSlice";

import numberWithCommas from "../utils/numberWithCommas";
import ButtonCustom from "./ButtonCustom";
import axios from "axios";
import BasicRating from "./BasicRating";
import { Rating, Typography } from "@mui/material";

const ProductView = (props) => {
  const dispatch = useDispatch();
  console.log(props);
  let product = props.product;

  if (product === undefined)
    product = {
      title: "",
      price: "",
      image01: null,
      image02: null,
      categorySlug: "",
      colors: [],
      name: "",
      size: [],
      description: "",
    };

  const [previewImg, setPreviewImg] = useState(product.image01);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  const check = () => {
    if (color === undefined) {
      alert("Vui lòng chọn màu sắc!");
      return false;
    }

    if (size === undefined) {
      alert("Vui lòng chọn kích cỡ!");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .request({
        method: "POST",
        url: `http://localhost:8080/api/cart`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
        data: {
          productId: product.productId,
          userId: loginData.dataLogin.id,
          quantity: quantity,
        },
      })
      .then((response) => {
        console.log("ok");
      });
  };

  const goToCart = () => {
    let newItem = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    };
    if (dispatch(addItem(newItem))) {
      dispatch(remove());
      props.history.push("/cart");
    } else {
      alert("Fail");
    }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image)}
          >
            <img
              src={`http://localhost:8080/products/` + product.image}
              alt=""
            />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image)}
          >
            <img
              src={`http://localhost:8080/products/` + product.image}
              alt=""
            />
          </div>
        </div>
        <div className="product__images__main">
          <img
            className="img__show"
            src={`http://localhost:8080/products/` + product.image}
            alt=""
          />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <ButtonCustom
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </ButtonCustom>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.name}</h1>
        <div>
          <Typography component="legend">Tổng đánh giá</Typography>
          <Rating name="read-only" value={5} readOnly />
        </div>

        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.price)}
          </span>
        </div>

        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <ButtonCustom onClick={() => addToCart()}>thêm vào giỏ</ButtonCustom>
          <ButtonCustom onClick={() => goToCart()}>mua ngay</ButtonCustom>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className="product-description__toggle">
          <ButtonCustom
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
