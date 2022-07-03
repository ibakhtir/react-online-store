import React from "react";
import { useSelector } from "react-redux";

import { getItems } from "../../store/items";

import ItemCard from "./itemCard";

const ItemsList = () => {
  const items = useSelector(getItems());

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          {items && items.map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
