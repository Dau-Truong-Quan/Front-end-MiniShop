import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Payment from "../pages/Payment";
import Account from "../pages/Account";

const router = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/catalog/:slug" component={Product} />
        <Route exact path="/catalog" component={Catalog} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/payment" component={Payment} />
        <Route path="/account" component={Account} />
      </Switch>
    </div>
  );
};

export default router;
