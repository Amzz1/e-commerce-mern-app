import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/login";
import Register from "./pages/register";

import React from "react";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Admin from "./pages/admin";
import EditProduct from "./admin/EditProduct";
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
          <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/admin/add-product" element={<Admin />}></Route>
            <Route path="/admin/edit-product/:id" element={<EditProduct />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
