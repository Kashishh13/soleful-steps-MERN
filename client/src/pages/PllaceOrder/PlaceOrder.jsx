
import React, { useContext, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount,food, cartItems, url } = useContext(StoreContext);
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

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  
  const place = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error("Error: No token found");
      alert("Error: You need to be logged in to place an order.");
      return;
    }
  
    let orderItems = [];
    food.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; 
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    console.log("Order Items:", orderItems);
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50,
    };
  
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
      });
  
      console.log("Response:", response.data);
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Error: Unable to process payment", response.data.message);
        alert("Error: Unable to process payment");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error: Something went wrong while placing the order");
    }
  };
  
  
  return (
    <div className="ban">
    <div className="po">
    <p className="title">Delivery Information</p>
      <form onSubmit={place} className="place-order">
      
        
          <div className="multi-fields">
         
            <input required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
              className="input-field"
            />
            <input required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
              className="input-field"
            />
          
          <input required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="E-mail"
            className="input-field"
          />
          <input required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
            className="input-field"
          />
        
            <input required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              className="input-field"
            />
            <input required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              className="input-field"
            />
         
          
            <input required
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="ZipCode"
              className="input-field"
            />
            <input required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              className="input-field"
            />
        
          <input required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Mobile"
            className="input-field"
          />
        </div>

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
            <button className='proceed'>Pay</button>
          </div>
      </form>
    </div>
    </div>
  );
};

export default PlaceOrder;
