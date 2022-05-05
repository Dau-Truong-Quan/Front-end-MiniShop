import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'

const router = () => {
  return (
    <div>

<Switch>
    <Route path='/' exact component={Home} />
    <Route path='/catalog/:slug' component={Product}/>
    <Route exact path='/catalog'  component={Catalog}/>
    <Route path='/cart' component={Cart}/>
</Switch>
    </div>
  )
}

export default router