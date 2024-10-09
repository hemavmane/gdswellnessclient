import React from "react";
import { useLocation } from "react-router-dom";
import "./failure.css"
export default function Failure() {
  const location = useLocation();
  const { error } = location.state || {};

  return (
   <div className="row m-auto">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="message-box _success _failed">
          <i class="fa fa-times-circle" aria-hidden="true"></i>
          <h2> Your payment failed </h2>
          <p>
            {" "}
            {error && (
              <p>
                <strong>Oh No, Your payment could not be completed due to {error}</strong> 
              </p>
            )}
          </p>
          <p> Try again later </p>
        </div>
      </div>
    </div>
   </div>
  );
}
