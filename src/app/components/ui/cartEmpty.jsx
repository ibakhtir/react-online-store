import React from "react";

import emptyCartImg from "../../assets/empty-cart.png";
import BackButton from "../common/backButton";

const CartEmpty = () => (
  <div className="container my-4">
    <BackButton />
    <h2 className="text-center mt-3">
      Корзина пустая <span>😕</span>
    </h2>
    <img
      src={emptyCartImg}
      width={400}
      className="img-fluid mx-auto d-block mt-5 p-3"
      alt="Пустая корзина"
    />
  </div>
);

export default CartEmpty;
