import React, { useState } from "react";
import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Grid from "../components/Grid";
import { useSelector, useDispatch } from "react-redux";

import policy from "../assets/fake-data/policy";
import { setList } from "../redux/productLists/productListSlide";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import { Link } from "react-router-dom";

import PolicyCard from "../components/PolicyCard";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Home = () => {
  const [productLists, setProductLists] = React.useState(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios.get(`http://localhost:8080/api/product/all`).then((response) => {
      console.log(response.data);
      setProductLists(response.data);
      dispatch(setList(response.data));
    });
  }, []);
  let heroSliderData = [];
  if (productLists != null) {
    heroSliderData = productLists;

    heroSliderData = heroSliderData.filter((e) => 8 == e.category.categoryId);
    console.log(heroSliderData);
    heroSliderData.forEach((element) => {
      if (element.productId == 23) {
        element.color = "orange";
      } else if (element.productId == 25) {
        element.color = "pink";
      } else {
        element.color = "blue";
      }
    });
  }

  return (
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={5000}
      />
      {/* end hero slider */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/policy">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}

      {/* best selling section */}
      <Section>
        <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productLists != null ? (
              productLists
                .slice(0, 4)
                .map((item, index) => (
                  <ProductCard
                    key={index}
                    img01={item.image}
                    img02={item.image}
                    name={item.name}
                    price={Number(item.price)}
                    slug={String(item.category.categoryId)}
                    productId={item.productId}
                  />
                ))
            ) : (
              <></>
            )}
          </Grid>
        </SectionBody>
      </Section>
      {/* end best selling section */}
    </Helmet>
  );
};

export default Home;
