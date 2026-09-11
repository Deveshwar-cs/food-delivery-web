import React, {useContext} from "react";
import "./ExploreMenu.css";
import {StoreContext} from "../../context/UseStoreContext";

const ExploreMenu = ({category, setCategory}) => {
  const {menu_list} = useContext(StoreContext);
  console.log(menu_list.data);
  return (
    <section className="explore-menu" id="explore-menu">
      <div className="explore-menu__header">
        <h2 className="section-title">Explore our menu</h2>
        <p className="section-subtitle">
          Browse by category and find your next favourite dish
        </p>
      </div>

      <div className="explore-menu__track">
        {menu_list.map((item) => (
          <button
            key={item.name}
            className={`explore-menu__pill ${
              category === item.name ? "active" : ""
            }`}
            onClick={() =>
              setCategory((prev) => (prev === item.name ? "All" : item.name))
            }
          >
            <div
              className={`explore-menu__pill-img ${
                category === item.name ? "active" : ""
              }`}
            >
              <img src={item.image} alt={item.name} />
            </div>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className="explore-menu__divider" />
    </section>
  );
};

export default ExploreMenu;
