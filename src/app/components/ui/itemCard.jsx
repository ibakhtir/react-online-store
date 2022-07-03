import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Counter from "../common/counter";

const ItemCard = ({ item }) => (
  <div className="col-xl-3 col-lg-4 col-md-6 my-2">
    <div className="d-flex flex-column h-100">
      <Link to={`/item/${item.id}`}>
        <img
          src={item.imageUrl}
          className="item-img img-fluid p-2"
          alt={item.name}
        />
      </Link>
      <div className="d-flex justify-content-around align-items-center">
        <h4>{item.name}</h4>
        <h4>
          <span className="badge bg-dark fw-normal text-warning">
            {`${item.price} ₴`}
          </span>
        </h4>
      </div>
      <p className="fst-italic p-2">{item.description}</p>
      <div className="d-flex justify-content-around mt-auto mb-2">
        <button type="button" className="btn btn-dark text-warning w-50">
          Добавить
        </button>
        <Counter />
      </div>
    </div>
  </div>
);

ItemCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.string)
};

export default ItemCard;
