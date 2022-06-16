import React from "react";
import { Link } from "react-router-dom";
import Grid from "./Grid";

import logo from "../assets/images/LogoMiniShop.png";

const footerAboutLinks = [
  {
    display: "Giới thiệu",
    path: "/about",
  },
  {
    display: "Liên hệ",
    path: "/about",
  },
  {
    display: "Tuyển dụng",
    path: "/about",
  },
  {
    display: "Tin tức",
    path: "/about",
  },
  {
    display: "Hệ thống cửa hàng",
    path: "/about",
  },
];

const footerCustomerLinks = [];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">Tổng đài hỗ trợ</div>
            <div className="footer__content">
              <p>
                Liên hệ đặt hàng <strong>0364296143</strong>
              </p>
              <p>
                Thắc mắc đơn hàng <strong>0364296143</strong>
              </p>
              <p>
                Góp ý, khiếu nại <strong>0364296143</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="footer__title">Về MiniShop</div>
            <div className="footer__content">
              {/* {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))} */}
              <p>Facebook page</p>

              <a href="https://www.facebook.com/MiniStore-104669222281651/?notif_id=1655275179760849&notif_t=aymt_simplified_make_page_post&ref=notif">
                Ministore.com!
              </a>
            </div>
          </div>
          <div>
            <div className="footer__title">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.2612087312175!2d106.78490560817617!3d10.84781333234899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527131ae8b249%3A0x4d2d3c8fab7d3c2e!2zOTcgxJAuIE1hbiBUaGnhu4duLCBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1655362165620!5m2!1svi!2s"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="footer__content">
              {footerCustomerLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to="/">
                <img src={logo} className="footer__logo" alt="" />
              </Link>
            </p>
            <p>
              Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng
              triệu người tiêu dùng Việt. Hãy cùng MiniShop hướng đến một cuộc
              sống năng động, tích cực hơn.
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
