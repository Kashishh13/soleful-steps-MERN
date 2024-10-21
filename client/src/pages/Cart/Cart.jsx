


import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from 'react-router-dom';
import { IoIosRemoveCircle } from "react-icons/io";

const Cart = () => {
  const { cartItems, food, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Check if there are any items in the cart
  const hasItems = Object.values(cartItems).some(item => item > 0);

  return (
    <div className="ban">
      <div className="cart">
        <div className="cart-items">
          {hasItems ? (
            food.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id} className="cart-item">
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {cartItems[item._id]}</p>
                    </div>
                    <IoIosRemoveCircle className="remove-icon" onClick={() => removeFromCart(item._id)} />
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p className="not-found">No items found in the cart.</p>
          )}
        </div>
        {hasItems && (
          <div className="cart-summary">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee:</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details total">
              <b>Total:</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
            </div>
            <button className='proceed' onClick={() => navigate('/order')}>Place Order</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
