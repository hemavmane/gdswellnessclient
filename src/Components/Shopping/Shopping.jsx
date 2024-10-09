import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import "./Shopping.css";
import { Pagination } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { RotatingLines } from "react-loader-spinner";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(16);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(activePage, limit);
  }, [activePage, limit]);

  const getProduct = async (page, limit) => {
    setIsloading(true);
    try {
      let response = await axios.get(
        `https://api.gdswellness.com/api/product/getalldata?page=${page}&limit=${limit}`
      );
      
      if (response.status === 200) {
        let sortdata = response.data.data.sort((a, b) => a.order - b.order);

        setProducts(sortdata);
        setTotal(response.data.total);
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products", error);
      setError("Network Error: Could not fetch products");
    } finally {
      setIsloading(false);
    }
  };

  const handleSale = data => {
    let productSlug = data.productName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product/${productSlug}`);
  };

  const handleAddToCart = product => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <>
     {/* <Header /> */}
      {isLoading ? (
        <div className="d-flex justify-content-center containes">
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row gx-3 gy-4">
            {products.map(product => (
              <div
                key={product._id}
                className="col-12 col-md-6 col-lg-4 mt-5 mb-4">
                <div
                  className="product_inner_Container h-100"
                  onClick={() => handleSale(product)}>
                  <button className="sale">Sale</button>
                  <img
                    src={`https://api.gdswellness.com/Product/${product.productimage[0]}`}
                    alt={product.productName}
                    className="product-img 
                card-img-top"
                  />
                  <div className="container">
                    <p className="product-title p-2 auto">
                      {product.productName}
                    </p>
                    <p className="d-flex justify-content-center">
                      <span className="real-price fs-5 text-muted me-2">
                        ${product.realPrice}
                      </span>
                      <span className="fs-5 offer-price">
                        ${product.offerPrice}
                      </span>
                    </p>
                    <button
                      className="add-to-cart m-auto"
                      onClick={() => handleAddToCart(product)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center align-items-center my-4">
            <Pagination
              prev
              last
              next
              first
              size="lg"
              total={total}
              limit={limit}
              activePage={activePage}
              onChangePage={setActivePage}
            />
          </div>
        </div>
      )}
      {/* <Footer/> */}
    </>
  );
};

export default Shopping;
