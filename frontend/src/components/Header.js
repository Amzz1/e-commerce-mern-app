import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { BsFillCartFill, BsFillPersonFill, BsList } from "react-icons/bs";
import { useSelector } from "react-redux";    
import { logout } from "../redux/authReducer";
import { useDispatch } from "react-redux";
import useClickOutside from "../customHook/useClickOutside";

const Header = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const handleLogout = () => {
      console.log('logout')
        dispatch(logout());
        setAccountActive(false);
 
      };
    
  
    const getTotalQuantity = () => {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
  const {
    isActive: isSidebarActive,
    setIsActive: setSidebarActive,
    containerRef: sidebarContainerRef,
  } = useClickOutside();
  const {
    isActive: isAccountActive,
    setIsActive: setAccountActive,
    containerRef: accountContainerRef,
  } = useClickOutside();

  const handleAccountButtonClick = () => {
    setAccountActive(!isAccountActive);
    setSidebarActive(false); // Close the sidebar if it's open
  };
  const handleSidebarButtonClick = () => {
    setSidebarActive(!isSidebarActive);
    setAccountActive(false); // Close the account dropdown if it's open
  };

  const handleOutsideClick = (event) => {
    if (!sidebarContainerRef.current?.contains(event.target)) {
      setSidebarActive(false);
    }
    if (!accountContainerRef.current?.contains(event.target)) {
      setAccountActive(false);
    }
  };


  return (
    <div className="header-container" onClick={handleOutsideClick}>
      <div className="sidebar-mobile" ref={sidebarContainerRef}>
        <button onClick={handleSidebarButtonClick}>
          <BsList />
        </button>
        {isSidebarActive && (
          <div className={`sidebar ${isSidebarActive ? "active" : ""}`}>
            <div className="sidebar-menu">
              <Link to="product/category/best-seller">Best seller</Link>
              <Link to="product/category/skincare">Skin care</Link>
              <Link to="product/category/bodyandhair">Body and hair care</Link>
              <Link to="product/category/perfume">Perfume</Link>
              <Link to="product/category/makeup">Makeup</Link>
            </div>
          </div>
        )}
      </div>

      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-container">
        <Link to="product/category/best-seller">Best seller</Link>
        <Link to="product/category/skincare">Skin care</Link>
        <Link to="product/category/bodyandhair">Body and hair care</Link>
        <Link to="product/category/perfume">Perfume</Link>
        <Link to="product/category/makeup">Makeup</Link>
      </div>
      <div className="header-icons">
        <div className="header-icons_cart">
          <Link to="/cart">
            <BsFillCartFill />
          </Link>
          <span>{getTotalQuantity()}</span>
        </div>
        <div className="account-container" ref={accountContainerRef}>
          <button onClick={handleAccountButtonClick}>
            <BsFillPersonFill />
          </button>
          {isAccountActive && (
            <div className="account grid">
              {user ? (
                <>
                  <span>Hi {user.username}</span>
                  {/* <a className="logout">Logout</a> */}
                  <a className="logout" onClick={handleLogout}>Logout</a>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
