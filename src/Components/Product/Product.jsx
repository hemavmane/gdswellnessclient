import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import Magnifier from "react-magnifier";
import Slider from "react-slick";

import { addToCart } from "../Redux/cartSlice";
import { LineWave } from "react-loader-spinner";
import { useDispatch } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ReactApi = "https://api.gdswellness.com";
export default function Product() {
  const { productname_slug } = useParams();
  const prodname = productname_slug?.replace(/-/g, " ");
  const [Productdata, setProductdata] = useState(null);
  const [filtredData, setRelatedProduct] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [ActiveImage, setActiveImage] = useState(
    Productdata?.productimage?.[0]
  );

  useEffect(() => {
    if (Productdata?.productimage && Productdata.productimage.length > 0) {
      const initialImage = Productdata.productimage[0];
      setActiveImage(initialImage);
    }
  }, [Productdata]);
  useEffect(() => {
    getRelatedProduct();
  }, []);
  const handleViewImage = img => {
    setActiveImage(img);
  };
  const [Description, setDescription] = useState(0);

  const handleToggle = data => {
    setDescription(data);
  };

  const getRelatedProduct = async () => {
    try {
      setisLoading(true);

      let response = await axios.get(
        `https://api.gdswellness.com/api/product/getallProduct`
      );
console.log(response,"response")
      if (response.status === 200) {
        const Productname = response.data.data.find(
          ele => ele.productName?.toLowerCase() === prodname
        );
        setProductdata(Productname);
        const currentProductName = Productdata.productName?.toLowerCase();
        const currentCategory = Productdata.category?.toLowerCase();

        const filtredData = response.data.data.filter(ele => {
          const isSameCategory =
            ele.category?.toLowerCase() === currentCategory;
          const isDifferentProduct =
            ele.productName?.toLowerCase() !== currentProductName;

          return isSameCategory && isDifferentProduct;
        });

        setRelatedProduct(filtredData);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setisLoading(false); // Ensure loading state is set to false
    }
  };

  const settings = {
    dots: true, // Set to true to show dots
    infinite: false, // Set to false to stop cycling through items
    speed: 500,
    slidesToShow: 4, // Show one product at a time
    slidesToScroll: 1, // Scroll one at a time
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1, // Show one product at a time on larger screens
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show one product at a time on smaller screens
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show one product at a time on mobile
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSale = data => {
    let productSlug = data.productName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product/${productSlug}`);
  };
  const handleAddToCart = product => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const GalarySetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
    <>
      {isLoading ? (
        <div
          className="m-auto text-center d-flex justify-content-center"
          style={{ height: "100vh" }}>
          <LineWave
            visible={true}
            height="200"
            width="200"
            className="m-auto"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      ) : (
        <div className="row m-auto">
          <div className="row shopcontainer m-auto">
            <p className="mt-3 p-3">
              <a className="text-decoration-none text-dark" href="/">
                Home
              </a>{" "}
              /{" "}
              <a className="text-decoration-none text-dark" href="/">
                {Productdata?.category}
              </a>{" "}
              / <span>{Productdata?.productName}</span>
            </p>
            <div className="row  p-4 m-auto">
              {window.innerWidth < 768 ? (
                <div className="col-md-6 m-auto mb-4 mobileview-pro">
                  <Slider {...GalarySetting} className="product-image-slider">
                    {Productdata?.productimage?.map(Ele => (
                      <div key={Ele} className="p-1">
                        <img
                          className="thumbnail-image img-fluid"
                          onMouseEnter={() => handleViewImage(Ele)}
                          src={`${ReactApi}/Product/${Ele}`}
                          alt=""
                          height={200}
                          width={300}
                        />
                      </div>
                    ))}
                  </Slider>{" "}
                </div>
              ) : (
                <div className="col-md-6 m-auto webviewprod">
                  <div className="row m-auto">
                    <div className="col-md-12">
                      <Magnifier
                        className="view-image img-fluid"
                        src={`${ReactApi}/Product/${ActiveImage}`}
                      />
                    </div>
                  </div>

                  <div className="row mt-3 m-auto">
                    {Productdata?.productimage?.map(Ele => (
                      <div key={Ele} className="col-3 col-md-2 p-1">
                        <img
                          className="thumbnail-image img-fluid"
                          onMouseEnter={() => handleViewImage(Ele)}
                          src={`${ReactApi}/Product/${Ele}`}
                          alt=""
                          height={80}
                          width={80}
                          style={{ height: "100px" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="col-md-6 ">
                <div className="product-details">
                  <h2 className="row product-name">
                    {Productdata?.productName}
                  </h2>
                  <p className="d-flex">
                    <span className="real-price me-3">
                      ${Productdata?.realPrice}
                    </span>{" "}
                    <span className="offer-price">
                      ${Productdata?.offerPrice}
                    </span>
                  </p>

                  <p className="product-subtitle">{Productdata?.subtitle}</p>
                  <p className="product-category">
                    <strong>Category:</strong> {Productdata?.category}
                  </p>
                  <p className="product-unit">
                    <strong>Unit:</strong> {Productdata?.unit}
                  </p>
                  <p className="product-packsize">
                    <strong>Pack Size:</strong> {Productdata?.packsize}
                  </p>
                  <div className="row">
                    <button
                      className="col-md-2 p-2 add-to-cart"
                      onClick={() => handleAddToCart(Productdata)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container p-4 m-auto">
              <div className="row mt-3">
                <div className="col-md-4 me-auto">
                  <a
                    className="cursor me-2  text-dark"
                    onClick={() => handleToggle(0)}>
                    Description
                  </a>{" "}
                  <a
                    className="cursor me-2  text-dark"
                    onClick={() => handleToggle(1)}>
                    Additional information
                  </a>
                  <a
                    className="cursor  text-dark"
                    onClick={() => handleToggle(2)}>
                    Reviews
                  </a>
                </div>
              </div>

              <div className="row mt-3">
                <div className="product-description">
                  {Description === 0 && (
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: Productdata?.discription,
                      }}></div>
                  )}
                  {Description === 1 && (
                    <>
                      <p className="fs-1">Additional information</p>
                      <hr />
                      <p>
                        <span className="pack-size fs-5 me-4">Pack Size</span>{" "}
                        <span className="me-1"> {Productdata.packsize}</span>
                        {Productdata.unit}
                      </p>
                      <hr />
                    </>
                  )}

                  {Description === 2 && (
                    <>
                      <h1>Reviews</h1>
                      <p>There are no reviews yet.</p>
                      <p>
                        Only logged-in customers who have purchased this product
                        may leave a review.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="row mt-3 m-auto">
              <div className="row">
                <h1>Related Products</h1>
              </div>
            </div>

            <div className="row product-slider-container m-auto mb-5">
              {filtredData?.length > 0 ? (
                <Slider {...settings} className="row m-auto">
                  {filtredData.map(product => (
                    <div
                      key={product._id}
                      className="col-6 col-md-4 col-lg-3 m-2 p-3 mb-3">
                      <div className="product_inner_Container ">
                        <button
                          className="sale"
                          onClick={() => handleSale(product)}>
                          Sale
                        </button>
                        <img
                          src={`https://api.gdswellness.com/Product/${product.productimage[0]}`}
                          alt={product.productName}
                          className="card-img-top"
                          height={200}
                          width={200}
                        />
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
                            <span className="offer-price">
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
                </Slider>
              ) : (
                <div className="row m-auto">
                  <p>No related products available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
