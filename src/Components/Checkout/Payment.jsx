import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import "./checkout.css";

export default function Checkout() {
  const userdata = JSON.parse(localStorage.getItem("userdata"));

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const location = useLocation();

  let data = location.state || null;
  let cartItems = data.cartItems;
  let cartTotal = data.cartTotal;

  let initialData = {
    country: "",
    state: "",
    fName: "",
    lName: "",
    address: "",
    flatAddress: "",
    city: "",
    zipcode: "",
    contact: "",
    amount: "",
  };

  const [payloadData, setpayloadData] = useState(initialData);
  const [OrderData, setOrderData] = useState();
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("https://9712-106-51-110-60.ngrok-free.app/api/pay", {
        cardNumber,
        expMonth,
        expYear,
        cvv,
        amount: cartTotal,
      });

      if (response.data.success) {
        toast.success("Payment Successful: " + response.data.message);
        handleCheckout();
      } else {
        toast.error("Payment Failed: " + response.data.error);
      }
    } catch (error) {
      toast.error("Payment Error: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  const handleCheckout = async () => {
    try {
      let data = {
        OrderId: OrderData.length + 1,
        userId: userdata._id,
        country: payloadData.country,
        state: payloadData.state,
        address: payloadData.address,
        amount: cartTotal,
        city: payloadData.city,
        zipcode: payloadData.zipcode,
        contact: payloadData.contact,
        fName: payloadData.fName,
        lName: payloadData.lName,
        flatAddress: payloadData.flatAddress,
        ProductDetails: cartItems,
        status: "Pending",
      };
      let response = await axios.post(
        `https://api.gdswellness.com/api/order/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Order created successfully");
        setpayloadData(initialData);
      }
    } catch (error) {
      toast.error("Error creating order: " + error.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      let res = await axios.get("https://api.gdswellness.com/api/order/getdata");
      if (res.status === 200) {
        setOrderData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row bg-light m-auto">
      <div className="col-md-10 m-auto">
        <div className="row">
          <div className="col-md-6 me-auto">
            <p className="subheading fs-5">Contact Information</p>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
            <p>
              We'll use this email to send you details and updates about your order.
            </p>
            <Form.Control placeholder="Email address" className="p-3" />

            <div className="row mt-2">
              <p className="subheading fs-5">Billing address</p>
              <p>Enter the billing address that matches your payment method.</p>
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={setSelectedCountry}
                placeholder="Select a country"
                className="p-2"
              />
            </div>

            <Select
              options={stateOptions}
              value={selectedState}
              onChange={setSelectedState}
              placeholder="Select a state"
              className="row p-2"
            />
            <div className="row">
              <div className="col-md-6">
                <Form.Control
                  placeholder="First name"
                  value={payloadData.fName}
                  onChange={e => setpayloadData({ ...payloadData, fName: e.target.value })}
                  className="p-3"
                />
              </div>
              <div className="col-md-6">
                <Form.Control
                  placeholder="Last name"
                  value={payloadData.lName}
                  onChange={e => setpayloadData({ ...payloadData, lName: e.target.value })}
                  className="p-3"
                />
              </div>
            </div>

            <div className="row mt-3">
              <Form.Control
                placeholder="Address"
                value={payloadData.address}
                onChange={e => setpayloadData({ ...payloadData, address: e.target.value })}
                className="p-3"
              />
            </div>
            <div className="row mt-3">
              <Form.Control
                placeholder="Apartment, suite, etc. (optional)"
                value={payloadData.flatAddress}
                onChange={e => setpayloadData({ ...payloadData, flatAddress: e.target.value })}
                className="p-3"
              />
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <Form.Control
                  placeholder="City"
                  value={payloadData.city}
                  onChange={e => setpayloadData({ ...payloadData, city: e.target.value })}
                  className="p-3"
                />
              </div>
              <div className="col-md-6">
                <Form.Control
                  placeholder="Zip code"
                  value={payloadData.zipcode}
                  onChange={e => setpayloadData({ ...payloadData, zipcode: e.target.value })}
                  className="p-3"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <Form.Control
                  placeholder="Phone"
                  value={payloadData.contact}
                  onChange={e => setpayloadData({ ...payloadData, contact: e.target.value })}
                  className="p-3"
                />
              </div>
            </div>

            <div className="form-group mt-3">
              <label>Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mt-3">
              <label>Expiration Month</label>
              <input
                type="text"
                value={expMonth}
                onChange={e => setExpMonth(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mt-3">
              <label>Expiration Year</label>
              <input
                type="text"
                value={expYear}
                onChange={e => setExpYear(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mt-3">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={e => setCvv(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mt-3">
              <label>Amount</label>
              <input
                type="text"
                value={cartTotal}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group mt-3">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Pay Now
              </button>
            </div>
          </div>
          <div className="col-md-5">
            <div className="row mt-5 border-bottom pb-3">
              <div className="col-md-7">Order Items</div>
              <div className="col-md-5 text-end">Price</div>
            </div>
            {cartItems.map((item, index) => (
              <div className="row border-bottom py-3" key={index}>
                <div className="col-md-7">{item.productNaame}</div>
                <div className="col-md-5 text-end">${item.offerPrice}</div>
              </div>
            ))}
            <div className="row py-3">
              <div className="col-md-7">Total</div>
              <div className="col-md-5 text-end">{cartTotal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
