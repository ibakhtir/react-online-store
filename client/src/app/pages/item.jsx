import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Comments from "../components/ui/comments";
import ItemInfo from "../components/ui/itemInfo";
import { getItemById } from "../store/items";
import { addItem } from "../store/cart";

const Item = () => {
  const { itemId } = useParams();

  const item = useSelector(getItemById(itemId));

  const dispatch = useDispatch();

  const handleClick = () => {
    const cartItem = {
      ...item,
      count: 1
    };
    dispatch(addItem(cartItem));
  };

  return (
    item && (
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="mb-3 col-md-4 d-flex flex-column align-items-center text-center h-100">
            <img
              width={350}
              src={item.imageUrl}
              alt={item.name}
              className="img-fluid my-2"
            />
            <h4 className="mt-2">{item.name}</h4>
            <ItemInfo item={item} />
            <button
              type="button"
              className="btn btn-dark text-warning w-75"
              onClick={handleClick}
            >
              Добавить
            </button>
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    )
  );
};

export default Item;
