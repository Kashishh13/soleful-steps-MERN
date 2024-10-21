
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food, setFood] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userID, setUserID] = useState(localStorage.getItem('userID') || '');
  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
    }
  };

  const removeFromCart = async (itemId) => {
    if (token) {
      try {
        const response = await axios.post(url + "/api/cart/remove", { itemId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] === 1) {
              delete updatedCart[itemId];
            } else if (updatedCart[itemId] > 1) {
              updatedCart[itemId] -= 1;
            }
            return updatedCart;
          });
        } else {
          console.log("Error removing item from cart:", response.data.message);
        }
      } catch (error) {
        console.log("Error removing item from cart:", error);
      }
    } else {
      console.log("User needs to login");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food.find((product) => product._id === item);
        totalAmount += itemInfo.price*cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFood(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (token) {
        await loadCartData(token);
      }
    }
    loadData();
  }, [token]);

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } });
    setCartItems(response.data.CartData);
  };

  const contextValue = {
    food,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    setToken,
    token,
    userID,
    setUserID
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;


