import React, { useCallback, useState, useEffect, useRef } from "react";

import Helmet from "../components/Helmet";
import CheckBox from "../components/CheckBox";

import ButtonCustom from "../components/ButtonCustom";
import InfinityList from "../components/InfinityList";
import axios from "axios";

const Catalog = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const [theLoai, setTheLoai] = React.useState(null);

  const [productLists, setProductLists] = React.useState(null);
  const [listDefault, setListDefault] = React.useState(null);
  React.useEffect(() => {
    axios.get(`http://localhost:8080/api/product/all`).then((response) => {
      setProductLists(response.data);
      setListDefault(response.data);
    });
  }, []);
  React.useEffect(() => {
    axios.get(`http://localhost:8080/api/category/all`).then((response) => {
      setTheLoai(response.data);
    });
  }, []);

  const [filter, setFilter] = useState(initFilter);

  const filterSelect = (type, checked, item) => {
    console.log(item);
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categoryId],
          });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categoryId
          );
          console.log(newCategory);
          setFilter({ ...filter, category: newCategory });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const updateProducts = useCallback(() => {
    let temp = listDefault;

    if (filter.category.length > 0) {
      temp = temp.filter((e) =>
        filter.category.includes(e.category.categoryId)
      );
    }

    setProductLists(temp);
  }, [filter, listDefault]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {theLoai != null ? (
                theLoai.map((item, index) => (
                  <div
                    key={index}
                    className="catalog__filter__widget__content__item"
                  >
                    <CheckBox
                      label={item.name}
                      onChange={(input) =>
                        filterSelect("CATEGORY", input.checked, item)
                      }
                      checked={filter.category.includes(item.categoryId)}
                    />
                  </div>
                ))
              ) : (
                <> </>
              )}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <ButtonCustom size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </ButtonCustom>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <ButtonCustom size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </ButtonCustom>
        </div>
        <div className="catalog__content">
          {productLists === null ? <></> : <InfinityList data={productLists} />}
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
