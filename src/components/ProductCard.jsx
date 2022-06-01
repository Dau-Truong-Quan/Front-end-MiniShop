import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { set } from "../redux/product-modal/productModalSlice";

import ButtonCustom from "./ButtonCustom";

import numberWithCommas from "../utils/numberWithCommas";

const ProductCard = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <div>
        <Link to={`/catalog/${props.productId}`}>
          <div className="product-card__image">
            <img src={`http://localhost:8080/products/` + props.image} alt="" />
            <div className="product-card__to">
              <div className="product-card__to__detail">Xem chi tiết</div>
            </div>
          </div>
          <div className="product-card__name">{props.name}</div>
          <div className="product-card__price">
            {numberWithCommas(props.price)}
            <span className="product-card__price__old">
              {props.discount > 0 ? <del>{props.priceOld}</del> : <></>}
            </span>
          </div>
        </Link>
      </div>
      <div className="product-card__btn">
        <ButtonCustom
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => dispatch(set(props.productId))}
        >
          chọn mua
        </ButtonCustom>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
