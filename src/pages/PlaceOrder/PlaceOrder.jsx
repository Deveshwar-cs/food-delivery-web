import React, {useContext} from "react";
import "./PlaceOrder.css";
import {StoreContext} from "../../context/UseStoreContext";
import {formatINR} from "../../components/FoodItem/FoodItem";

const DELIVERY_FEE = 49;

const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext);
  const subtotal = getTotalCartAmount();
  const total = subtotal + DELIVERY_FEE;

  return (
    <div className="place-order">
      <div className="place-order__header">
        <h1 className="section-title">Checkout</h1>
        <p className="section-subtitle">Enter your delivery details below</p>
      </div>

      <form className="place-order__form" onSubmit={(e) => e.preventDefault()}>
        {/* ── Delivery form ── */}
        <div className="place-order__left card">
          <h2 className="place-order__section-label">Delivery Information</h2>

          <div className="form-row">
            <div className="form-field">
              <label>First name</label>
              <input type="text" placeholder="Rahul" required />
            </div>
            <div className="form-field">
              <label>Last name</label>
              <input type="text" placeholder="Sharma" required />
            </div>
          </div>

          <div className="form-field">
            <label>Email address</label>
            <input type="email" placeholder="rahul@example.com" required />
          </div>

          <div className="form-field">
            <label>Street address</label>
            <input type="text" placeholder="12, MG Road" required />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>City</label>
              <input type="text" placeholder="Bengaluru" required />
            </div>
            <div className="form-field">
              <label>State</label>
              <input type="text" placeholder="Karnataka" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>PIN code</label>
              <input type="text" placeholder="560001" required />
            </div>
            <div className="form-field">
              <label>Country</label>
              <input type="text" placeholder="India" required />
            </div>
          </div>

          <div className="form-field">
            <label>Phone number</label>
            <input type="tel" placeholder="+91 98765 43210" required />
          </div>
        </div>

        {/* ── Order summary ── */}
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

            {/* Payment notice */}
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
