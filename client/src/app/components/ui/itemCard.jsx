import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Badge from "../common/badge";
import Counter from "../common/counter";
import { addItem } from "../../store/cart";

const ItemCard = ({ item }) => {
  const { _id, name, description, imageUrl, price } = item;

  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    setCounter((prevState) => prevState + 1);
  };

  const handleDecrement = () => {
    if (counter > 1) setCounter((prevState) => prevState - 1);
  };

  const handleClick = () => {
    const cartItem = {
      ...item,
      count: counter
    };
    dispatch(addItem(cartItem));
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 my-2">
      <div className="d-flex flex-column h-100">
        <Link to={`/item/${_id}`}>
          <img src={imageUrl} className="item-img img-fluid p-2" alt={name} />
        </Link>
        <div className="d-flex justify-content-around align-items-center">
          <h4>{name}</h4>
          <h4>
            <Badge
              data={`${price} ₴`}
              color="dark"
              rest="fw-normal text-warning"
            />
          </h4>
        </div>
        <p className="fst-italic p-2">{description}</p>
        <div className="d-flex justify-content-around mt-auto mb-2">
          <button
            type="button"
            className="btn btn-dark text-warning w-50"
            onClick={handleClick}
          >
            Добавить
          </button>
          <Counter
            onPlus={handleIncrement}
            onMinus={handleDecrement}
            counter={counter}
          />
        </div>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
  )
};

export default ItemCard;
