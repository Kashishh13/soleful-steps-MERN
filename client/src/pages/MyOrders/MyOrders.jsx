import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { FaShoePrints } from 'react-icons/fa';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, userID } = useContext(StoreContext);

  const fetchOrder = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        { userID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token && userID) {
      fetchOrder();
    }
  }, [token, userID]);

  return (
    <div className="ban">
    <div className="mo">
      <h1>My Orders</h1>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <FaShoePrints className="order-logo" />
              <div className="order-details">
                <p className="order-items">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p className="order-amount">₹{order.amount}.00</p>
                <p className="order-count">Items: {order.items.length}</p>
                <p className="order-status">
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No orders found.</h1>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyOrders;
