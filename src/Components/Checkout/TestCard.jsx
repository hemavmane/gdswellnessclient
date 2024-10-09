import axios from "axios";
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { Pagination } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const TestCard = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(16);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      let response = await axios.get(
        `https://api.gdswellness.com/api/product/getallProduct`
      );

      if (response.status === 200) {
        console.log(response.data.data,"response.data")
        const data = response.data.data.find(
          ele => ele?.productName?.toLowerCase() == "test product"
        );
       
        setProducts(data);
        setTotal(response.data.total);
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products", error);
      setError("Network Error: Could not fetch products");
    }
  };

  const handleSale = data => {
    navigate("/product", { state: data });
  };

  const handleAddToCart = product => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="container mt-4">
      <div className="row gx-3 gy-4">
        
          <div  className="col-12 col-md-6 col-lg-4 mt-5 mb-4">
            <div className="product_inner_Container shadow h-100">
              <button className="sale" onClick={() => handleSale(products)}>
                Sale
              </button>
              <img
                src={`https://api.gdswellness.com/Product/${products?.productimage?.[0]}`}
                alt={products?.productName}
                className="product-img 
                card-img-top"
              />
              <div className="container">
                <p className="product-title p-2 auto">{products?.productName}</p>
                <p className="d-flex justify-content-center">
                  <span className="real-price fs-5 text-muted me-2">
                    ${products?.realPrice}
                  </span>
                  <span className="fs-5 offer-price">
                    ${products?.offerPrice}
                  </span>
                </p>
                <button
                  className="add-to-cart m-auto"
                  onClick={() => handleAddToCart(products)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
       
      </div>
     
    </div>
  );
};

export default TestCard;
