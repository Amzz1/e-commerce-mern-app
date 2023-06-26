import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/login";
import Register from "./pages/register";

import React from "react";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Admin from "./pages/admin";
import EditProduct from "./admin/EditProduct";
import Home from "./pages/home";
import Product from "./pages/product";
import Category from "./pages/category";
import CartItems from "./components/CartItems";
import Footer from "./components/Footer";
import GetAllProducts from "./admin/GetAllProducts";
const ROLES = {
  User: 2001,
  Admin: 9909,
};
const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<PrivateRoute allowedRoles={[ ROLES.User]} />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="product/category/:name" element={<Category />}></Route>
            <Route path="product/:id" element={<Product />}></Route>
            <Route path="cart/product/:id" element={<Product />}></Route>
            <Route path="product/category/:name/product/:id" element={<Product />}></Route>
            <Route path="/cart" element={<CartItems />}></Route>
          </Route>
          <Route element={<PrivateRoute allowedRoles={[ROLES.Admin, ROLES.User]} />}>
            <Route path="/admin" element={<GetAllProducts />}></Route>
            <Route path="/admin/add-product" element={<Admin />}></Route>
            <Route path="/admin/edit-product/:id" element={<EditProduct />}></Route>
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
