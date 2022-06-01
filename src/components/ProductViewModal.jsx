import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import ProductView from "./ProductView";

import ButtonCustom from "./ButtonCustom";

import { remove } from "../redux/product-modal/productModalSlice";
import { logDOM } from "@testing-library/react";

const ProductViewModal = () => {
  const productSlug = useSelector((state) => state.productModal.value);

  const productList = useSelector((state) => state.productList.value);
  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    productSlug != null
      ? setProduct(productList.find((e) => e.productId == productSlug))
      : setProduct(undefined);
  }, [productSlug]);

  return (
    <div
      className={`product-view__modal ${product === undefined ? "" : "active"}`}
    >
      <div className="product-view__modal__content">
        <ProductView product={product} />
        <div className="product-view__modal__content__close">
          <ButtonCustom size="sm" onClick={() => dispatch(remove())}>
            đóng
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
