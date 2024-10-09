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
    contact: "",
    email: "",
  };

  const [payloadData, setPayloadData] = useState(initialData);
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validated, setValidated] = useState(false);

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
    const formattedCountries = countries.map(country => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(formattedCountries);

    const defaultCountry = formattedCountries.find(
      country => country.value === "US"
    );
    setSelectedCountry(defaultCountry);
  };

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value);
      const formattedStates = states.map(state => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStateOptions(formattedStates);
    } else {
      setStateOptions([]);
    }
  }, [selectedCountry]);

  const validateForm = () => {
    const trimmedCardNumber = cardNumber.replace(/\s+/g, "");
    const trimmedPhoneNumber = phoneNumber.replace(/\s+/g, "");
    const isCardNumberValid = /^\d{16}$/.test(trimmedCardNumber);
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
    if (!payloadData.contact || !isContactValid)
      formErrors.contact = "Valid Phone Number is required.";
    if (!isCardNumberValid)
      formErrors.cardNumber = "Valid Card Number is required.";
    if (!isExpMonthValid)
      formErrors.expMonth = "Valid Expiry Month is required.";
    if (!isExpYearValid) formErrors.expYear = "Valid Expiry Year is required.";
    if (!isCvvValid) formErrors.cvv = "Valid CVV is required.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const requestData = {
      cardNumber,
      expMonth,
      expYear,
      cvv,
      amount: cartTotal,
      country: selectedCountry?.label || "",
      state: selectedState?.label || "",
      address: payloadData.address,
      city: payloadData.city,
      zipcode: payloadData.zipcode,
      contact: payloadData.contact,
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
        const orderId = generateOrderId();
        toast.success(
          `Your Payment for a total amount of ${cartTotal} is successful for order ID: <a href="/order/${orderId}">${orderId}</a>. Thank you for placing an order with <strong>GD Wellness LLC</strong>.`
        );

        await handleCheckout();
        navigate("/success");
      } else {
        toast.error(
          `Oh No, Your payment could not be completed due to ${response.data.error}. Please try again later.`
        );

        navigate("/failure", { state: { error: response.data.error } });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Unknown error";
      toast.error("Payment Error: " + errorMessage);
      navigate("/failure", { state: { error: errorMessage } });
    }
  };

  const generateOrderId = () => {
    const randomPart = Math.floor(100000 + Math.random() * 900000);
    const timestampPart = Date.now().toString().slice(-2);
    return `GDS${randomPart}${timestampPart}`;
  };

  const dispatch = useDispatch();
  const handleCheckout = async () => {
    try {
      const orderId = generateOrderId();

      if (!validateForm()) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const products = cartItems.map(cartItem => ({
        productId: cartItem?._id,
        productName: cartItem?.productName,
        quantity: cartItem?.quantity,
        offerPrice: cartItem?.offerPrice,
        productimage: cartItem?.productimage,
        description: cartItem?.description,
      }));

      const data = {
        OrderId: orderId,
        userId: userdata?._id,
        country: selectedCountry?.label || "",
        state: selectedState?.label || "",
        address: payloadData.address,
        amount: cartTotal,
        city: payloadData.city,
        zipcode: payloadData.zipcode,
        contact: payloadData.contact,
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

        if (response.data.success) {
          navigate("/success", { state: { orderId, cartItems, cartTotal } });
        } else {
          toast.error(
            `Oh No, Your payment could not be completed due to ${response.data.error}. Please try again later.`
          );
          navigate("/failure", { state: { error: response.data.error } });
        }
      }
    } catch (error) {
      toast.error("Error creating order: " + error.message);
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setPayloadData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <div className="row bg-light m-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="checkout-body">
        <div className="row m-auto">
          <div className="checkout-col-main col-md-6 p-3 m-auto">
            <p className="checkout-subheading">Contact Information</p>
          </div>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
          <Form
            className="col-md-8"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}>
              <Row>
              <Col md={6}>
              <Form.Control
                placeholder="Email address"
                className="checkout-form-control" 
                onChange={handleChange}
                value={payloadData.email}
                name="email"
                type="email"
                required
              /></Col>
              </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formFName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={payloadData.fName}
                    onChange={handleChange
                    }
                    name=""
                    isInvalid={!!errors.fName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={payloadData.lName}
                    onChange={e =>
                      setPayloadData({ ...payloadData, lName: e.target.value })
                    }
                    isInvalid={!!errors.lName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={payloadData.email}
                    onChange={
                      handleChange
                    }
                    name="email"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contact Number"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    isInvalid={!!errors.contact}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contact}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address Line 1"
                    value={payloadData.address}
                    onChange={e =>
                      setPayloadData({
                        ...payloadData,
                        address: e.target.value,
                      })
                    }
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formFlatAddress">
                  <Form.Label>Address Line 2 (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address Line 2"
                    value={payloadData.flatAddress}
                    onChange={e =>
                      setPayloadData({
                        ...payloadData,
                        flatAddress: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={payloadData.city}
                    onChange={e =>
                      setPayloadData({ ...payloadData, city: e.target.value })
                    }
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formZipcode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip Code"
                    value={payloadData.zipcode}
                    onChange={e =>
                      setPayloadData({
                        ...payloadData,
                        zipcode: e.target.value,
                      })
                    }
                    isInvalid={!!errors.zipcode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.zipcode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Select
                    options={stateOptions}
                    value={selectedState}
                    onChange={setSelectedState}
                  />
                </Form.Group>
              </Col>
            </Row>
            <h3>Payment Information</h3>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formCardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    isInvalid={!!errors.cardNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formExpMonth">
                  <Form.Label>Expiry Month</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM"
                    value={expMonth}
                    onChange={e => setExpMonth(e.target.value)}
                    isInvalid={!!errors.expMonth}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expMonth}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formExpYear">
                  <Form.Label>Expiry Year</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="YY"
                    value={expYear}
                    onChange={e => setExpYear(e.target.value)}
                    isInvalid={!!errors.expYear}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expYear}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={e => setCvv(e.target.value)}
                    isInvalid={!!errors.cvv}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cvv}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <button type="submit" className="btn btn-primary">
              Pay Now
            </button>
          </Form>
          <div className="col-md-4  checkout-col-summary">
            <div className="row shadow-sm">
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
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
