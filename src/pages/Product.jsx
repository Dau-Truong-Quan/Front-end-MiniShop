import React from "react";

import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";
import { useSelector, useDispatch } from "react-redux";
import productData from "../assets/fake-data/products";
import BasicRating from "../components/BasicRating";
import Feedback from "../components/Product/Feedback";

const Product = (props) => {
  // const product = productData.getProductBySlug(props.match.params.productId);

  const productSlug = useSelector((state) => state.productList.value);

  const getProductBySlug = (slug) =>
    productSlug.find((e) => e.productId == slug);

  let product = getProductBySlug(props.match.params.slug);

  // sản phẩm liên quan
  let relatedProducts = productSlug;

  relatedProducts = relatedProducts.filter(
    (e) => product.category.categoryId === e.category.categoryId
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={product.name}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <Feedback product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.slice(0, 8).map((item, index) => (
              <ProductCard
                key={index}
                productId={item.productId}
                image={item.image}
                name={item.name}
                price={Number(item.price)}
                slug={String(item.category.categoryId)}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
