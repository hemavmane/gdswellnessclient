import React, { useState } from "react";
import "./Style/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import gdwlogo2 from "../Images/gdwlogo2.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice";

const Header = () => {
  const userdata = localStorage.getItem("userdata");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  let data = JSON.parse(userdata) || null;
 
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleIncreaseQuantity = id => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = id => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleRemoveFromCart = id => {
    dispatch(removeFromCart({ id }));
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const subtotal = cartItems
    .reduce((total, item) => total + item.quantity * item.offerPrice, 0)
    .toFixed(2);
  const navigate = useNavigate();
  const handleSale = data => {
    navigate("/product", { state: data });
    setCartOpen(false);
  };

  const handleCheckout = () => {
    if (!userdata) {
      alert("Please Login");
      window.location.assign("/login");
      setCartOpen(false);
    } else {
      navigate("/checkout", {
        state: { cartTotal: subtotal, cartItems: cartItems },
      });
      setCartOpen(false);
    }
  };
  const [userOpen, setuserOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("userdata");
    setuserOpen(false);
    alert("You have successfully logged out!");
    window.reload("/");
  };

  return (
    <>
      <nav className="HeaderNav">
        <div className="HeaderNavCompanyName">
          <NavLink to="/">
            <img
              className="healthconsultancyLogo"
              src={gdwlogo2}
              alt="LogoIcon"
            />
          </NavLink>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(!menuOpen)}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" onClick={() => setMenuOpen(!menuOpen)}>
              SHOP
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setMenuOpen(!menuOpen)}>
              ABOUT US
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setMenuOpen(!menuOpen)}>
              CONTACT US
            </NavLink>
          </li>

          <li>
            {userdata ? (
              <NavLink onClick={() => setuserOpen(true)}>
                {" "}
                {data?.username?.toUpperCase()}
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={() => setMenuOpen(!menuOpen)}>
                LOGIN
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/cart" onClick={toggleCart}>
              <PiShoppingCartSimpleBold style={{ fontSize: "25px" }} />
              {totalItemsInCart > 0 && (
                <span className="cart-item-count">{totalItemsInCart}</span>
              )}
            </NavLink>
          </li>
        </ul>
        <div className="HeaderNavHamburger">
          {!menuOpen ? (
            <GiHamburgerMenu
              className="Hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          ) : (
            <IoCloseSharp
              className="CloseIcon"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          )}
        </div>
      </nav>

      <Offcanvas
        placement="end"
        show={userOpen}
        onHide={() => setuserOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Account Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row">
            <p>
              <span className="me-3 bold">Account Name : </span>
              {data?.username=="" ? data?.displayName: data?.username}
            </p>
            <p>
              <span className="me-3 bold">contact : </span>
              {data?.phone}
            </p>
            <p>
              <span className="me-3 bold">Email : </span>
              {data?.email}
            </p>
            <a className="row m-0 fs-5 cursor" href="/order">
              My Orders
            </a>
          </div>
        </Offcanvas.Body>
        <Offcanvas.Header className="row">
          <hr />

          <div className="row p-2 m-auto">
            <button
              className="col-6 col-md-5  p-2 checkout"
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        </Offcanvas.Header>
      </Offcanvas>
      <Offcanvas
        placement="end"
        show={cartOpen}
        onHide={() => setCartOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <p className="subheading text-bold">Your cart is empty</p>
          ) : (
            cartItems.map(product => (
              <div key={product._id} className="row mb-2 mt-5 p-2">
                <div className="col-4 col-md-3">
                  <img
                    src={`https://api.gdswellness.com/Product/${product.productimage[0]}`}
                    alt={product.productName}
                    className="product-img card-img-top"
                    style={{ height: "90px" }}
                  />
                </div>
                <div className="col-8 col-md-7">
                  <a
                    className="cart_title text-dark m-auto cursor"
                    onClick={() => handleSale(product)}>
                    {product.productName}
                  </a>
                  <div className="row m-auto">
                    <span className="col-6 col-md-3 text-decoration-line-through me-2">
                      ${product.realPrice.toFixed(2)}
                    </span>
                    <span className="col-6 col-md-3">
                      ${product.offerPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="row mt-3 mb-3 m-auto">
                    <span className="col-12 col-md-7 save p-1">
                      Save $
                      {(product.realPrice - product.offerPrice).toFixed(2)}
                    </span>
                  </div>
                  <div className="row">
                    <p className="col-12 cart_title2 m-auto">
                      {product.subtitle.length > 60
                        ? product.subtitle.substring(0, 60) + "..."
                        : product.subtitle}
                    </p>
                  </div>
                  <div className="row m-auto mt-3">
                    <button className="col-12 col-md-7 p-1 cart-item-quantity">
                      <span
                        className="quantity-btn"
                        onClick={() => handleDecreaseQuantity(product._id)}>
                        -
                      </span>
                      <span className="mx-2 title">{product.quantity}</span>
                      <span
                        className="quantity-btn"
                        onClick={() => handleIncreaseQuantity(product._id)}>
                        +
                      </span>
                    </button>
                  </div>
                  <div className="row mt-2">
                    <a
                      className="text-dark col-12 col-md-8"
                      onClick={() => handleRemoveFromCart(product._id)}>
                      Remove Item
                    </a>
                  </div>
                </div>
                <div className="col-12 col-md-2">
                  <p className="row">
                    ${(product.quantity * product.offerPrice).toFixed(2)}
                  </p>
                  <span className="row save p-1">
                    Save $
                    {(
                      product.quantity *
                      (product.realPrice - product.offerPrice)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </Offcanvas.Body>
        <Offcanvas.Header className="row">
          <hr />
          <div className="row">
            <span className="me-auto col-6 col-md-2 bold">Subtotal</span>
            <span className="col-6 col-md-3 bold">${subtotal}</span>
          </div>
          <p className="row cart_titil m-auto p-2">
            Shipping, taxes, and discounts calculated at checkout.
          </p>
          <div className="row p-2 m-auto">
            <button className="col-6 col-md-5 m-auto p-2 view-cart">
              <a href="/cart" className="view">
                View My Cart
              </a>
            </button>

            <button
              className="col-6 col-md-5 m-auto p-2 checkout"
              onClick={handleCheckout}>
              Go to Checkout
            </button>
          </div>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
};

export default Header;
