import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCartItems, getTotalPrice, clearItems } from "../store/cart";
import { calcTotalCount } from "../utils/calculations";
import Badge from "../components/common/badge";
import BackButton from "../components/common/backButton";
import CartItem from "../components/ui/cartItem";
import CartEmpty from "../components/ui/cartEmpty";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems());
  const totalPrice = useSelector(getTotalPrice());
  const totalCount = calcTotalCount(cartItems);

  const handleClickClear = () => {
    dispatch(clearItems());
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container my-4">
      <BackButton />
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-10 cart-items-block">
          <h2 className="mb-1 mt-3 p-2">
            <i className="bi bi-cart fs-3" /> Корзина
          </h2>
          <div className="text-end text-muted mb-2">
            <span
              role="button"
              tabIndex="0"
              aria-hidden="true"
              className="cart-clear"
              onClick={handleClickClear}
            >
              <i className="bi bi-trash" /> Очистить корзину
            </span>
          </div>
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="row border-top m-0 mb-2 p-3">
            <p className="col-md-6 lead fw-normal text-center mb-2">
              Сумма заказа:{" "}
              <span className="fw-bold text-warning">{`${totalPrice} ₴`}</span>{" "}
              <Badge
                data={`${totalCount} шт.`}
                color="light"
                rest="rounded-pill ms-1"
              />
            </p>
            <div className="col-md-6 text-center">
              <button type="button" className="btn btn-warning w-100">
                Оплатить <i className="bi bi-credit-card ms-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
