import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Payment from "../pages/Payment";
import Account from "../pages/Account";
import SignInSide from "../components/Login/LoginForm";
import RegisterForm from "../components/Register/RegisterForm";
import ForgotPassword from "../components/Login/ForgotPassword";
import ChoooseEmailOrPhone from "../components/Login/ChoooseEmailOrPhone";
import NewPassword from "../components/Login/newPassword";
import EnterOTP from "../components/Login/EnterOTP";

const router = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/catalog/:slug" component={Product} />
        <Route exact path="/catalog" component={Catalog} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={SignInSide} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/payment" component={Payment} />
        <Route path="/account" component={Account} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/choooseEmailOrPhone" component={ChoooseEmailOrPhone} />
        <Route path="/newPassword" component={NewPassword} />
        <Route path="/enterOTP" component={EnterOTP} />
      </Switch>
    </div>
  );
};

export default router;
