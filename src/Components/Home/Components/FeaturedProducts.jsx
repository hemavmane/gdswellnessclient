import React, { useEffect, useState } from "react";
import "./Styles/FeaturedProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from "react-router";

const FeaturedProducts = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filtredData, setRelatedProduct] = useState();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  useEffect(() => {
    getRelatedProduct();
  }, [cartItems]);
  const getRelatedProduct = async () => {
    try {
      let response = await axios.get(
        `https://api.gdswellness.com/api/product/getallProduct`
      );

      if (response.status === 200) {
        let filtredData = response.data.data.filter((ele) =>
          cartItems.map(
            (cart) =>
              cart.category === ele.category &&
              cart.productName?.toLowerCase() == ele.productName?.toLowerCase()
          )
        );
        setRelatedProduct(filtredData);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1151,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
      {
        breakpoint: 677,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  };
  const handleSale = (data) => {
    let productSlug = data.productName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product/${productSlug}`);
  };

  return (
    <div className="FeaturedProducts row product-details2 m-auto">
      {filtredData?.length > 0 && (
        <Slider {...settings} className="mb-3">
          {filtredData.map((product) => (
            <div key={product._id} className="m-auto slider-prod">
              <div
                className="FeaturedProducts_inner_Container  product_inner_Container  m-auto"
                onClick={() => handleSale(product)}
                style={{ cursor: "pointer" }}
              >
                <button className="sale">Sale</button>
                <div className="image_container">
                  <img
                    alt={product.productName}
                    className="card-img-top card_img "
                    src={`https://api.gdswellness.com/Product/${product.productimage[0]}`}
                  />
                </div>
                <div className="container text-center">
                  <p className="product-title p-2">
                    {product.productName.length > 25
                      ? `${product.productName.substring(0, 25)}...`
                      : product.productName}
                  </p>

                  <p className="d-flex justify-content-center">
                    <span className="real-price text-muted me-2">
                      ${product.realPrice}
                    </span>
                    <span className="offer-price">${product.offerPrice}</span>
                  </p>
                  <button
                    className="add-to-cart m-auto"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default FeaturedProducts;
