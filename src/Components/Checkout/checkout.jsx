import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import "./checkout.css";
import { useDispatch } from "react-redux";

import { clearCart } from "../Redux/cartSlice";

export default function Checkout() {
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const [OrderData, setOrderData] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  let data = location.state || null;
  let cartItems = data?.cartItems || [];
  let cartTotal = data?.cartTotal || 0;
  const [errors, setErrors] = useState({});
  const initialData = {
    country: "",
    state: "",
    fName: "",
    lName: "",
    address: "",
    flatAddress: "",
    city: "",
    zipcode: "",

    email: "",
  };

  const [payloadData, setPayloadData] = useState(initialData);
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    getOrder();
    loadCountryOptions();
  }, []);

  const getOrder = async () => {
    try {
      let res = await axios.get(
        "https://api.gdswellness.com/api/order/getdata"
      );
      if (res.status === 200) {
        setOrderData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCountryOptions = () => {
    const countries = Country.getAllCountries();
    const formattedCountries = countries.map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(formattedCountries);
    const defaultCountry = formattedCountries.find(
      (country) => country.value === "US"
    );
    setSelectedCountry(defaultCountry);
  };

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value);
      const formattedStates = states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStateOptions(formattedStates);
    } else {
      setStateOptions([]);
    }
  }, [selectedCountry]);

  const validateForm = () => {
    const trimmedCardNumber = cardNumber.replace(/\s+/g, ""); // Remove spaces

    const trimmedPhoneNumber = phoneNumber.replace(/\s+/g, "");
    const isCardNumberValid = /^\d{14,16}$/.test(trimmedCardNumber);
    const isExpMonthValid = /^(0[1-9]|1[0-2])$/.test(expMonth);
    const isExpYearValid = /^\d{2}$/.test(expYear);
    const isCvvValid = /^\d{3,4}$/.test(cvv);
    const isContactValid = /^\d{10}$/.test(trimmedPhoneNumber);
    const isZipcodeValid = /^\d{5,6}$/.test(payloadData.zipcode);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payloadData.email);

    const formErrors = {};

    if (!payloadData.fName) formErrors.fName = "First Name is required.";
    if (!payloadData.lName) formErrors.lName = "Last Name is required.";
    if (!payloadData.email || !isEmailValid)
      formErrors.email = "Valid Email is required.";
    if (!payloadData.address)
      formErrors.address = "Address Line 1 is required.";
    if (!payloadData.city) formErrors.city = "City is required.";
    if (!payloadData.zipcode || !isZipcodeValid)
      formErrors.zipcode = "Valid Zip Code is required.";
    if (!phoneNumber || !isContactValid)
      formErrors.phoneNumber = "Valid Phone Number is required.";

    if (!isCardNumberValid) {
      formErrors.cardNumber = "Card number must be between 14 and 16 digits.";
    }
    if (!isExpMonthValid) formErrors.expMonth = "Invalid Expiry Month.";
    if (!isExpYearValid) formErrors.expYear = "Invalid Expiry Year.";
    if (!isCvvValid) formErrors.cvv = "Invalid CVV.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };
  const generateOrderID = (OrderData) => {
    // Step 1: Get current date in the format YYYYMMDD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");

    // Step 2: Calculate the next order number based on OrderData length
    const orderNumber = OrderData.length + 1;

    // Step 3: Pad the order number to 4 digits (e.g., 0001, 0002, etc.)
    const paddedOrderNumber = String(orderNumber).padStart(4, "0");

    // Step 4: Append "S01" to the order number
    const orderID = `${year}${month}${day}${paddedOrderNumber}S01`;

    return orderID;
  };

  const newOrderID = generateOrderID(OrderData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    const trimmedCardNumber = cardNumber.replace(/\s+/g, "");
    const requestData = {
      cardNumber: trimmedCardNumber,
      expMonth,
      expYear,
      cvv,
      amount: cartTotal,
      country: selectedCountry?.label || "",
      state: selectedState?.label || "",
      address: payloadData.address,
      city: payloadData.city,
      zipcode: payloadData.zipcode,
      contact: phoneNumber,
      fName: payloadData.fName,
      lName: payloadData.lName,
      flatAddress: payloadData.flatAddress,
    };

    try {
      const response = await axios.post(
        "https://api.gdswellness.com/api/pay",
        requestData
      );

      if (response.data.success) {
        await handleCheckout();
        navigate("/success", { state: { newOrderID, cartItems, cartTotal } });
      } else {
        navigate("/failure", { state: { error: response.data.error } });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Unknown error";
      toast.error("Payment Error: " + errorMessage);
      navigate("/failure", { state: { error: errorMessage } });
    }
  };

  const dispatch = useDispatch();
  const handleCheckout = async () => {
    try {
      if (!validateForm()) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const products = cartItems.map((cartItem) => ({
        productId: cartItem?._id,

        quantity: cartItem?.quantity,
      }));

      const data = {
        OrderId: newOrderID,
        userId: userdata?._id,
        country: selectedCountry?.label || "",
        state: selectedState?.label || "",
        address: payloadData.address,
        amount: cartTotal,
        city: payloadData.city,
        zipcode: payloadData.zipcode,
        contact: phoneNumber,
        fName: payloadData.fName,
        lName: payloadData.lName,
        flatAddress: payloadData.flatAddress,
        ProductDetails: products,
        status: "Pending",
      };

      const response = await axios.post(
        "https://api.gdswellness.com/api/order/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(clearCart());
        setPayloadData(initialData);
      }
    } catch (error) {
      toast.error("Error creating order: " + error.message);
    }
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/^(\d{3})(\d{1,3})/, "$1 $2");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{1,4})/, "$1 $2 $3");
    }
    setPhoneNumber(value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayloadData((prev) => ({ ...prev, [name]: value }));
  };
  const formatExpDate = (value) => {
    return value
      .replace(/^([1-9])$/, "$1")
      .replace(/^(\d{2})(\d{1,2})/, "$1/$2")
      .substr(0, 5);
  };
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardNumber(value.replace(/(.{4})/g, "$1 ").trim());
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value);
  };
  const [validated, setValidated] = useState(false);

  return (
    <>
      <div className="row bg-light m-auto">
        <Toaster />

        <div className="row m-auto">
          <div className="col-md-8 m-auto">
            <p className="checkout-subheading">Contact Information</p>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  placeholder="Email address"
                  onChange={handleChange}
                  value={payloadData.email}
                  name="email"
                  type="email"
                  required
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <p className="checkout-subheading">Billing address</p>
              <Row>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="4"
                  controlId="validationCustom01"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    onChange={handleChange}
                    value={payloadData.fName}
                    name="fName"
                    placeholder="First name"
                    className=""
                    isInvalid={!!errors.fName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="4"
                  controlId="validationCustom02"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    onChange={handleChange}
                    value={payloadData.lName}
                    name="lName"
                    placeholder="Last name"
                    isInvalid={!!errors.lName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="4"
                  controlId="validationCustom02"
                >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    onChange={handlePhoneInput}
                    value={phoneNumber}
                    name="phone"
                    placeholder="XXX XXX XXXX"
                    isInvalid={!!errors.phoneNumber}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="6"
                  controlId="validationCustom01"
                >
                  <Form.Control
                    onChange={handleChange}
                    value={payloadData.address}
                    name="address"
                    placeholder="Address Line 1"
                    isInvalid={!!errors.address}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="6"
                  controlId="validationCustom02"
                >
                  <Form.Control
                    onChange={handleChange}
                    value={payloadData.flatAddress}
                    name="flatAddress"
                    placeholder="Address Line 2 (optional)"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="6"
                  controlId="validationCustom01"
                >
                  <Form.Control
                    onChange={handleChange}
                    value={payloadData.city}
                    name="city"
                    placeholder="City"
                    isInvalid={!!errors.city}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="6"
                  controlId="validationCustom02"
                >
                  <Select
                    options={stateOptions}
                    value={selectedState}
                    onChange={setSelectedState}
                    placeholder="Select a state"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Control
                    onChange={handleChange}
                    value={payloadData.zipcode}
                    name="zipcode"
                    placeholder="Zip code"
                    required
                    isInvalid={!!errors.zipcode}
                    maxLength="6"
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    {errors.zipcode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <p className="checkout-subheading p-2">Payment details</p>

                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="4"
                  controlId="validationCustom02"
                >
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength="19"
                    isInvalid={!!errors.cardNumber}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardNumber}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="4"
                  controlId="validationCustom02"
                >
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatExpDate(expMonth + expYear)}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");

                      let month = value.slice(0, 2);
                      let year = value.slice(2, 4);

                      if (month.length === 2) {
                        if (
                          parseInt(month, 10) < 1 ||
                          parseInt(month, 10) > 12
                        ) {
                          month = expMonth;
                        }
                      }

                      setExpMonth(month);
                      setExpYear(year);
                    }}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="4"
                  controlId="validationCustom02"
                >
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="CVV"
                    maxLength="4"
                    required
                  />
                </Form.Group>
              </Row>
            </Form>
          </div>

          <div className="col-md-4 mt-2">
            <div className="row checkout-col-summary">
              <p className="checkout-subheading">Order Summary</p>
              <div className="order-summary-container">
                <p>
                  <strong>Items:</strong> {cartItems.length}
                </p>
                <p>
                  <strong>Total:</strong> ${cartTotal}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="checkout-row mt-3">
            <button className="checkout-button" type="submit">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
