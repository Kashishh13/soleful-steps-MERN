

import React, { useContext } from 'react';
import './Card.css';
import { GoPlus } from 'react-icons/go';
import { StoreContext } from '../../Context/StoreContext';

const Card = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  
  return (
    <div className='food-item'>
      <div className='food-item-container'>
        <img src={`${url}/images/${image}`} className='food-item-img' alt={name} />
        {
          !cartItems[id]
            ? <GoPlus className='add-icon' onClick={() => addToCart(id)} />
            : <div className='food-item-counter'>
                <button onClick={() => removeFromCart(id)}>-</button>
                <span>{cartItems[id]}</span>
                <button onClick={() => addToCart(id)}>+</button>
              </div>
        }
      </div>
      <div className="card-info">
        <div className="card-header">
          <p className="card-name">{name}</p>
          <span className="card-genre">{description}</span>
        </div>
        <div className="card-price-container">
          <p className="card-price">₹{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
