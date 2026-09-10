import React, {useContext, useState} from "react";

import "./PlaceOrder.css";

import {StoreContext} from "../../context/UseStoreContext";

import {formatINR} from "../../uitls/formatINR";

import axios from "axios";

import {useNavigate} from "react-router";

const DELIVERY_FEE = 49;

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url, setCartItems} =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ========================================
  // CALCULATE TOTAL
  // ========================================

  const subtotal = getTotalCartAmount();

  const total = subtotal + DELIVERY_FEE;

  // ========================================
  // PLACE ORDER
  // ========================================

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      // ----------------------------------------
      // 1. Create order items
      // ----------------------------------------

      const orderItems = [];

      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          const itemInfo = {
            ...item,
            quantity: cartItems[item._id],
          };

          orderItems.push(itemInfo);
        }
      });

      // ----------------------------------------
      // 2. Prepare order data
      // ----------------------------------------

      const orderData = {
        address: data,
        items: orderItems,
        amount: total,
      };

      console.log("Sending order:", orderData);

      // ----------------------------------------
      // 3. Ask backend to create Razorpay order
      // ----------------------------------------

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          token,
        },
      });

      console.log("Backend response:", response.data);

      if (!response.data.success) {
        alert(response.data.message || "Unable to create order");
        return;
      }

      // ----------------------------------------
      // 4. Get Razorpay order
      // ----------------------------------------

      const {razorpayOrder} = response.data;

      console.log("Razorpay order:", razorpayOrder);

      // ----------------------------------------
      // 5. Razorpay Checkout options
      // ----------------------------------------
      console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "Food Delivery",

        description: "Food Order Payment",

        order_id: razorpayOrder.id,

        // ----------------------------------------
        // 6. Payment successful
        // ----------------------------------------
        // Rememember payment response comes from razorpay checkout
        handler: async function (paymentResponse) {
          console.log("Razorpay payment response:", paymentResponse);

          try {
            // ----------------------------------------
            // Send payment details to backend
            // ----------------------------------------

            const verifyResponse = await axios.post(
              `${url}/api/order/verify`,
              paymentResponse,
              {
                headers: {
                  token,
                },
              },
            );

            console.log("Verification response:", verifyResponse.data);

            // ----------------------------------------
            // Payment verified
            // ----------------------------------------

            if (verifyResponse.data.success) {
              alert("Payment Successful");

              // Clear form
              setData({
                firstName: "",
                lastName: "",
                email: "",
                street: "",
                city: "",
                state: "",
                zipcode: "",
                country: "",
                phone: "",
              });

              // Clear cart
              setCartItems({});

              // Go to orders
              navigate("/myorders");
            } else {
              alert(
                verifyResponse.data.message || "Payment verification failed",
              );
            }
          } catch (error) {
            console.error(
              "Payment verification error:",
              error.response?.data || error.message,
            );

            alert("Payment verification failed");
          }
        },

        // ----------------------------------------
        // Prefill user information
        // ----------------------------------------

        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },

        // ----------------------------------------
        // Theme
        // ----------------------------------------

        theme: {
          color: "#3399cc",
        },

        // ----------------------------------------
        // Payment modal
        // ----------------------------------------

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
      };

      // ----------------------------------------
      // 7. Create Razorpay instance
      // ----------------------------------------

      const razorpay = new window.Razorpay(options);

      // ----------------------------------------
      // 8. Payment failed event
      // ----------------------------------------

      razorpay.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response.error);

        alert(`Payment failed: ${response.error.description}`);
      });

      // ----------------------------------------
      // 9. Open Razorpay
      // ----------------------------------------

      razorpay.open();
    } catch (error) {
      console.error(
        "Place order error:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="place-order">
      <div className="place-order__header">
        <h1 className="section-title">Checkout</h1>

        <p className="section-subtitle">Enter your delivery details below</p>
      </div>

      <form className="place-order__form" onSubmit={placeOrder}>
        {/* Delivery Information */}

        <div className="place-order__left card">
          <h2 className="place-order__section-label">Delivery Information</h2>

          <div className="form-row">
            <div className="form-field">
              <label>First name</label>

              <input
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="Rahul"
                required
              />
            </div>

            <div className="form-field">
              <label>Last name</label>

              <input
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Sharma"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Email address</label>

            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="rahul@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label>Street address</label>

            <input
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder="12, MG Road"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>City</label>

              <input
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                type="text"
                placeholder="Bengaluru"
                required
              />
            </div>

            <div className="form-field">
              <label>State</label>

              <input
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                type="text"
                placeholder="Karnataka"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>PIN code</label>

              <input
                name="zipcode"
                onChange={onChangeHandler}
                value={data.zipcode}
                type="text"
                placeholder="560001"
                required
              />
            </div>

            <div className="form-field">
              <label>Country</label>

              <input
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                type="text"
                placeholder="India"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Phone number</label>

            <input
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="tel"
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        {/* Order Summary */}

        <div className="place-order__right">
          <div className="order-summary card">
            <h2 className="place-order__section-label">Order Summary</h2>

            <div className="order-summary__row">
              <span>Subtotal</span>

              <span>{formatINR(subtotal)}</span>
            </div>

            <div className="order-summary__row">
              <span>Delivery fee</span>

              <span>{formatINR(DELIVERY_FEE)}</span>
            </div>

            <div className="order-summary__divider" />

            <div className="order-summary__row order-summary__row--total">
              <b>Total</b>

              <b>{formatINR(total)}</b>
            </div>

            <div className="order-summary__payment-note">
              <span className="order-summary__lock">🔒</span>

              <span>Secure payment via Razorpay / UPI / Cards</span>
            </div>

            <button
              type="submit"
              className="btn-primary order-summary__pay-btn"
            >
              Pay {formatINR(total)}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
