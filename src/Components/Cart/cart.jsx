import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice";
import "./cart.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import axios from "axios";
import { Card } from "react-bootstrap";
// import Footer from "../Footer/Footer";
// import Header from "../Header/Header";

const CartData = () => {
  const [show, setShow] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [filteredCoupons, setFilteredCoupons] = useState();
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems
      .reduce((total, item) => total + item.quantity * item.offerPrice, 0)
      .toFixed(2);
    setCartTotal(total);
  }, [cartItems]);

  const handleIncreaseQuantity = id => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = id => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleRemoveFromCart = id => {
    dispatch(removeFromCart({ id }));
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: { cartTotal: cartTotal, cartItems: cartItems },
    });
  };

  const handleCoupon = () => {
    const discount = (cartTotal * filteredCoupons.discount) / 100;
    setCartTotal(prevTotal => (prevTotal - discount).toFixed(2));
  };

  useEffect(() => {
    fetchAllCoupons();
  }, [cartItems]);

  const fetchAllCoupons = async () => {
    try {
      // https://https://api.gdswellness.com
      const response = await axios.get(
        "https://api.gdswellness.com/api/coupons/getdata"
      );
      const data = response.data.find(ele => ele.code === coupon);

      setFilteredCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  return (
    <>
    {/* <Header/> */}
      <div className="container mb-3 m-auto ">
        {cartItems.length > 0 ? (
          <>
            <div className="cart p-3">
              <img src="../icons8-check-30.png" className="me-2" alt="Check" />
              <span className="me-auto">
                {cartItems.length > 0
                  ? `"${cartItems[0]?.productName}" has been added to your cart.`
                  : "Cart"}
              </span>
              <a className="float-end text-dark" href="/shop">
                Continue shopping
              </a>
            </div>
            <p className="fs-1">Cart</p>

            <div className="row">
              <div className="col-md-7 me-auto">
                <div>
                  <span className="title">PRODUCT</span>
                  <span className="float-end title">TOTAL</span>
                  <hr />
                </div>
                <div className="row m-auto">
                  {cartItems.map(product => (
                    <div key={product?._id} className="row mb-2 mt-5">
                      <div className="col-4 col-md-2">
                        <img
                          src={`https://api.gdswellness.com/Product/${product?.productimage[0]}`}
                          alt={product?.productName}
                          className="product-img card-img-top"
                          style={{ height: "100px" }}
                        />
                      </div>
                      <div className="col-8 col-md-8">
                        <div className="row d-flex">
                          <p className="col-md-9 me-auto fs-5">
                            {product?.productName}
                          </p>
                          <p className="col-md-3 fs-5">
                            $
                            {(product.quantity * product.offerPrice).toFixed(2)}
                          </p>
                        </div>
                        <div className="row d-flex">
                          <p className="col-md-3 cart-price  text-decoration-line-through fs-5 ">
                            ${product.realPrice.toFixed(2)}
                          </p>
                          <p className="col-md-3  fs-5 ">
                            ${product.offerPrice.toFixed(2)}
                          </p>

                          <div className="col-md-3 ">
                            <button className="save p-1">
                              Save $
                              {(product.realPrice - product.offerPrice).toFixed(
                                2
                              )}
                            </button>
                          </div>
                          <div className="col-md-3 cart-price">
                            <button className="save p-1">
                              Save $
                              {(
                                product.quantity *
                                (product.realPrice - product.offerPrice)
                              ).toFixed(2)}
                            </button>
                          </div>
                        </div>
                        <p className="row mt-3 cart_titil">
                          {product.subtitle.length > 60
                            ? product.subtitle.substring(0, 110) + "..."
                            : product.subtitle}
                        </p>
                        {/* <div>
                      <span className="d-block d-md-inline-block col-12 col-md-3 text-decoration-line-through fs-5 me-4">
                        ${product.realPrice.toFixed(2)}
                      </span>
                      <span className="d-block d-md-inline-block col-12 col-md-3 m-auto fs-5 me-3">
                        ${product.offerPrice.toFixed(2)}
                      </span>
                      <button className="d-block d-md-inline-block col-12 col-md-3 save p-1 m-auto">
                        Save $
                        {(product.realPrice - product.offerPrice).toFixed(2)}
                      </button>
                      <p className="mt-3 cart_titil">
                        {product.subtitle.length > 60
                          ? product.subtitle.substring(0, 110) + "..."
                          : product.subtitle}
                      </p>
                    </div>
                   
                    */}
                        <button className="d-block col-12 col-md-7 p-1 mt-2 cart-item-quantity">
                          <span
                            className="col-1 quantity-btn"
                            onClick={() => handleDecreaseQuantity(product._id)}>
                            -
                          </span>
                          <span className="col-2 mx-2 title">
                            {product.quantity}
                          </span>
                          <span
                            className="col-1 quantity-btn"
                            onClick={() => handleIncreaseQuantity(product._id)}>
                            +
                          </span>
                        </button>
                        <a
                          className="row text-dark cursor m-auto mt-3"
                          onClick={() => handleRemoveFromCart(product?._id)}>
                          Remove Item
                        </a>
                      </div>

                      <hr className="m-auto mt-3 p-3" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-4">
                <div className="row border p-2">
                  <div>
                    <span className="title">CART TOTALS</span>
                    <hr />
                  </div>
                  <div>
                    <span className="title">Add a coupon</span>
                    <span className="float-end title">
                      {show ? (
                        <RiArrowDropUpLine
                          onClick={() => setShow(false)}
                          className="fs-2"
                        />
                      ) : (
                        <RiArrowDropDownLine
                          onClick={() => setShow(true)}
                          className="fs-2"
                        />
                      )}
                    </span>
                    {show && (
                      <div className="mt-2">
                        <input
                          value={coupon}
                          onChange={e => setCoupon(e.target.value)}
                          className="enter-code p-3"
                          placeholder="Enter code"
                        />
                        <button
                          className="apply p-3 float-end"
                          onClick={handleCoupon}>
                          Apply
                        </button>
                      </div>
                    )}
                    <hr />
                    <div>
                      <span className="title">Subtotal</span>
                      <span className="float-end title">${cartTotal}</span>
                      <hr />
                    </div>
                    <div>
                      <span className="title text-bold">Total</span>
                      <span className="float-end title">${cartTotal}</span>
                    </div>
                    <div className="row mt-2">
                      <button className="apply p-2" onClick={handleCheckout}>
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="row containers">
            <h4 className="m-auto">My Cart</h4>
            <div className="row emptycart">
              <img className="emptycartimg" src="./emptycart.svg" />
              <h3 className="ngcontent-tmr-c9 m-auto">Your Cart is empty!</h3>
              <p className="cart-text m-0">You have no items added in the cart.</p>
              <p className="cart-text m-0"> Explore and add products you like!</p>
              <a href="/" className="add-product  m-auto">Add Product</a>
            </div>
          </div>
        )}
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default CartData;
