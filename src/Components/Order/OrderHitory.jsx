import React, { useEffect, useState } from "react";
import axios from "axios";
import "./order.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const OrderHitory = () => {
  const userdata = localStorage.getItem("userdata");
  let data = JSON.parse(userdata) || null;
  const [OrderData, setOrderData] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const response = await axios.get(
        "https://api.gdswellness.com/api/order/getdata"
      );
      const filterData = response.data.filter(ele => ele.userId === data._id);
      setOrderData(filterData);
      
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Function to format date and time
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <>
     <Header />
    <div className="container order-page">
      {OrderData.length > 0 ? (
        OrderData.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-header">
              <h5>Order ID: {order.OrderId}</h5>
              <p>Status: {order.status}</p>
            </div>
            {order.ProductDetails.map((product, idx) => (
              <div className="order-item row" key={idx}>
                <div className="col-md-3">
                  <img
                    src={`https://api.gdswellness.com/Product/${product.productimage?.[0]}`}
                    alt={product.productName}
                    className="product-image"
                  />
                </div>
                <div className="col-md-5 product-details">
                  <h6>{product.productName}</h6>
                  <p>Pack Size: {product.packsize}</p>
                  <p>{product.category}</p>
                  <p className="offer-price">${product.offerPrice}</p>
                </div>
                <div className="col-md-4 delivery-status">
                  {order.status === "Delivered" ? (
                    <>
                      <p>
                        Delivered on: {formatDate(order.deliveredAt)}
                      </p>
                      <p>Your item has been delivered</p>
                    </>
                  ) : order.status === "Shipped" ? (
                    <>
                      <p>
                        Shipped on: {formatDate(order.shippedAt)}
                      </p>
                      <p>Your item is on the way</p>
                    </>
                  ) : order.status === "Processing" ? (
                    <>
                      <p>
                        Order placed on: {formatDate(order.createdAt)}
                      </p>
                      <p>Your order is being processed</p>
                    </>
                  ) : (
                    <>
                      <p>Order Status: {order.status}</p>
                      <p>Please contact support for more details</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="text-center">
        <img  src="./cards@3x.png" height={300} />
        <h4 >You haven{"'"}t placed any order yet!</h4>
        <p >Order section is empty. After placing order, You can track them from here!</p></div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default OrderHitory;
