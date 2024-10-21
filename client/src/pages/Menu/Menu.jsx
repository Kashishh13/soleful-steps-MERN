


import React, { useContext, useState } from "react";
import { menu } from "../../images/assets.js"; // Assuming menu is imported correctly
import "./Menu.css";
import { StoreContext } from '../../Context/StoreContext.jsx';
import Card from "./Card.jsx";

const Menu = () => {
  const [category, setCategory] = useState("All");
  const { food } = useContext(StoreContext);

  return (
    <div className="bgc">
      <div className="explore" id="explore">
        <p className="tx">
          Explore our stylish collection and step into comfort today!
        </p>

        
          
            <div className="menu-items">
              {menu.map((item, index) => (
                <div
                  onClick={() =>
                    setCategory((prev) =>
                      prev === item.menu_name ? "All" : item.menu_name
                    )
                  }
                  key={index}
                  className="mlist"
                >
                 
                  <h4 className={`mname ${category === item.menu_name ? "active-name" : ""}`}>
                    {item.menu_name}
                  </h4>
                </div>
              ))}
           
          

          <div className="food-display" id='food-display'>
            
            <div className="food-display-list">
              {food.map((item, index) => {
                if (category === "All" || category === item.category) {
                  return (
                    <Card
                      key={index}
                      id={item._id}
                      name={item.name}
                    description={item.description}
                      image={item.image}
                      price={item.price}
                    
                    />
                  );
                }
                return null; // Ensure to return null if the condition is not met
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;




