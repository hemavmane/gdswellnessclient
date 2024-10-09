import React from "react";
import "./Style/ShippingPolicy.css";
import { useNavigate } from "react-router";
const ShippingPolicy = () => {
const navigate  = useNavigate();

  const returnpolicydata = {
    // "companyName": "GD Wellness LLC",
    message:
      "Thank you for choosing GD Wellness LLC! We appreciate your order for health supplies. This policy outlines the shipping process for your order.",
    orderProcessing: {
      description:
        "Orders placed over the phone are typically processed within 2-3 business days. You will receive confirmation of your order by phone or email (depending on your preference).",
    },
    shippingOptions: {
      domestic: {
        description:
          "We currently offer domestic shipping within the United States only. We provide several shipping options to meet your needs.",
        options: [
          {
            type: "Standard Shipping",
            description:
              "Estimated delivery within 12-14 business days (cost varies depending on weight and location).",
          },
          {
            type: "Expedited Shipping",
            description:
              "Estimated delivery within 4-5 business days (additional cost applies). Expedited delivery is currently available for a few of the fast selling items, please check with the Customer Service team before placing your order.",
          },
        ],
      },
    },
    shippingCosts: {
      description:
        "Shipping costs are calculated based on the weight of your order and your chosen shipping method. You will be informed of the exact shipping cost before finalizing your phone order.",
    },
    restrictions: {
      description:
        "Due to banking partners limitation, and to minimize fraud, we only ship to an address that matches to the billing address of the Credit or Debit card used for payment.",
    },
    orderTracking: {
      description:
        "Once your order ships, you will receive a notification with a tracking number via email (if provided) or over the phone. This allows you to track the progress of your delivery. We send all Domestic and International shipments through the United States Postal Service (USPS.com), unless otherwise stated.",
    },
    returnsAndExchanges: {
      description:
        "Due to the nature of health supplies, we are unable to accept returns or exchanges on opened or used products. However, if you receive a damaged or incorrect item, please contact us within 3-4 days of receiving your order. We will be happy to arrange for a replacement or issue a full refund, including any shipping costs.",
    },
    returnProcess: {
      description:
        "To initiate a return for a damaged or incorrect item, please contact our customer service team at +1 732 742 6875 or Support@GDSwellness.com. We will guide you through the return process and provide a return shipping label.",
    },
    refunds: {
      description:
        "Once we receive the returned item in its original unopened condition, we will process a full refund to your original payment method within 5-7 business days and up to a maximum of 30 days.",
    },
    wholesaleShippingAgreement: {
      description:
        "GD Wellness LLC posters agree to waive shipping charges on an initiating order or on any order picked up at our warehouse. On all other orders, the wholesaler agrees to remit shipping charges in addition to the total product charges listed on the P.O. or invoice. We are happy to use wholesale 'third party billing', given the account number and preferred provider.",
    },
    damagesPolicy: {
      description:
        "GD Wellness LLC stands behind our product and while delivery has its chances of problems, we want you to enjoy your product. Please take photos of the damage and call or email us with your order number. We will replace your order and use your information to file a claim. Please keep all packaging material and damaged goods.",
    },
    internationalShippingPolicy: {
      description:
        "We ship Internationally, by request only. Customers agree to remit all charges and fees associated with International shipping.",
    },
    disclaimers: {
      ageRestriction:
        "Age Restriction: We only sell health supplies to individuals aged 18 and over (or the legal age in your jurisdiction).",
      productDisclaimer:
        "Product Disclaimer: The information provided about our health supplies is for informational purposes only and should not be taken as a substitute for professional medical advice.",
      consultDoctor:
        "Consult a Doctor: We encourage you to consult with a doctor before using any health supplies, especially if you have pre-existing medical conditions or are taking medications.",
    },
    contactInformation: {
      description:
        "If you have any questions regarding our shipping policy, please don't hesitate to contact our customer service team at +1 732 742 6875 or Support@GDSwellness.com.",
    },
    thankYouMessage: "Thank you for your understanding!",
  };

  return (
    <div className="ShippingPolicy">
      <h1>
        <span onClick={() => navigate("/")}>Home</span>/
        <span>Shipping Policy</span>
      </h1>
      <div className="return-policy-container">
        <h1>{returnpolicydata.companyName}</h1>
        <p>{returnpolicydata.message}</p>

        <section>
          <h2>Order Processing</h2>
          <p>{returnpolicydata.orderProcessing.description}</p>
        </section>

        <section>
          <h2 style={{marginBottom:"6px"}}>Shipping Options</h2>
          <p style={{marginBottom:"3px"}}>{returnpolicydata.shippingOptions.domestic.description}</p>
          <ul>
            {returnpolicydata.shippingOptions.domestic.options.map(
              (option, index) => (
                <li key={index}>
                  <strong>{option.type}</strong>: {option.description}
                </li>
              )
            )}
          </ul>
        </section>

        <section>
          <h2>Shipping Costs</h2>
          <p>{returnpolicydata.shippingCosts.description}</p>
        </section>

        <section>
          <h2>Restrictions</h2>
          <p>{returnpolicydata.restrictions.description}</p>
        </section>

        <section>
          <h2>Order Tracking</h2>
          <p>{returnpolicydata.orderTracking.description}</p>
        </section>

        <section>
          <h2>Returns & Exchanges</h2>
          <p>{returnpolicydata.returnsAndExchanges.description}</p>
        </section>

        <section>
          <h2>Return Process</h2>
          <p>{returnpolicydata.returnProcess.description}</p>
        </section>

        <section>
          <h2>Refunds</h2>
          <p>{returnpolicydata.refunds.description}</p>
        </section>

        <section>
          <h2>Wholesale Shipping Agreement</h2>
          <p>{returnpolicydata.wholesaleShippingAgreement.description}</p>
        </section>

        <section>
          <h2>Damages Policy</h2>
          <p>{returnpolicydata.damagesPolicy.description}</p>
        </section>

        <section>
          <h2>International Shipping Policy</h2>
          <p>{returnpolicydata.internationalShippingPolicy.description}</p>
        </section>

        <section>
          <h2>Disclaimers</h2>
          <p>{returnpolicydata.disclaimers.ageRestriction}</p>
          <p>{returnpolicydata.disclaimers.productDisclaimer}</p>
          <p>{returnpolicydata.disclaimers.consultDoctor}</p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>{returnpolicydata.contactInformation.description}</p>
        </section>

        <p>{returnpolicydata.thankYouMessage}</p>
        <h3>GD Wellness LLC</h3>
      </div>
    </div>
  );
};

export default ShippingPolicy;
