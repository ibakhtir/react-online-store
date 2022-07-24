import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Comments from "../components/ui/comments";
import { getItemById } from "../store/items";

const Item = () => {
  const { itemId } = useParams();

  const item = useSelector(getItemById(itemId));

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
