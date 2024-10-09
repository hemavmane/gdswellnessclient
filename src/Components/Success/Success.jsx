import React from "react";
import { useLocation } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

export default function Success() {
  const location = useLocation();
  const { orderId, cartItems, cartTotal } = location.state || {};

  return (
    <div className="row m-auto">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="message-box _success">
              <FaCircleCheck className="payment-success" />
              <h2>Your payment was successful</h2>
              <p>
                {`Your Payment for a total amount of ${cartTotal} is successful for order ID: ${orderId}. Thank you for placing an order with GD Wellness LLC.`}
              </p>
            </div>
          </div>
        </div>

        {orderId && <h3>Order ID: {orderId}</h3>}

        <div className="purchased-products">
          <h4>Purchased Products:</h4>
          <ul>
            {cartItems?.map((item, index) => (
              <li key={index}>
                <p>
                  <strong>Product Name:</strong> {item.productName}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Price:</strong> ${item.offerPrice}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
