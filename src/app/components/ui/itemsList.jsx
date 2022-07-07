import React from "react";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

import { getItems } from "../../store/items";
import { getCategory, getSortProperties } from "../../store/filter";

import ItemCard from "./itemCard";

const ItemsList = () => {
  const items = useSelector(getItems());
  const categoryId = useSelector(getCategory());
  const { path, order } = useSelector(getSortProperties());

  function getFilteredItems(items = []) {
    if (categoryId !== "0") {
      return items.filter((obj) => obj.categories.includes(categoryId));
    }
    return items;
  }

  const filteredItems = getFilteredItems(items);
  const sortedItems = orderBy(filteredItems, [path], [order]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
