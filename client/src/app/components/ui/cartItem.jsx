import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Counter from "../common/counter";
import { plusItem, minusItem, removeItem } from "../../store/cart";

const CartItem = ({ item }) => {
  const { id, name, imageUrl, size, price, count } = item;
  const dispatch = useDispatch();

  const handleClickPlus = () => {
    dispatch(plusItem(item));
  };

  const handleClickMinus = () => {
    dispatch(minusItem(item));
  };

  const handleClickRemove = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className="card-body border-top mb-1 p-4">
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0">
          <img src={imageUrl} width={100} alt={name} />
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-4 mb-1">
              <p className="lead fw-semibold m-0">{name}</p>
              <p className="text-muted mb-1">
                Размер: <span>{size} см</span>
              </p>
            </div>
            <div className="col-md-3 px-1">
              <Counter
                onPlus={handleClickPlus}
                onMinus={handleClickMinus}
                counter={count}
              />
            </div>
            <div className="col-md-3 offset-md-1 mt-1">
              <p className="lead fw-normal m-0">{`${price * count} ₴`}</p>
            </div>
            <div className="col-md-1 text-end">
              <button
                type="button"
                aria-label="Remove button"
                className="btn btn-outline-secondary btn-sm rounded-circle"
                onClick={handleClickRemove}
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
  )
};

export default CartItem;
