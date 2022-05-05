import React from 'react'
import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Grid from '../components/Grid'

import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'
import productData from '../assets/fake-data/products'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import { Link } from 'react-router-dom'


import PolicyCard from '../components/PolicyCard'
import ProductCard from '../components/ProductCard'

const Home = () => {
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
            <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
            >
                {
                    policy.map((item, index) => <Link key={index} to="/policy">
                        <PolicyCard
                            name={item.name}
                            description={item.description}
                            icon={item.icon}
                        />
                    </Link>)
                }
            </Grid>
        </SectionBody>
    </Section>
    {/* end policy section */}

    {/* best selling section */}
    <Section>
        <SectionTitle>
            top sản phẩm bán chạy trong tuần
        </SectionTitle>
        <SectionBody>
            <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
            >
                {
                    productData.getProducts(4).map((item, index) => (
                        <ProductCard
                            key={index}
                            img01={item.image01}
                            img02={item.image02}
                            name={item.title}
                            price={Number(item.price)}
                            slug={item.slug}
                        />
                    ))
                }
            </Grid>
        </SectionBody>
    </Section>
    {/* end best selling section */}

    
</Helmet>
  )
}

export default Home