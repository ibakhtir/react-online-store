import React from "react";

import ItemsList from "../components/ui/itemsList";
import Categories from "../components/ui/categories";
import Sort from "../components/ui/sort";

const Main = () => (
  <div className="container my-2">
    <div className="row align-items-center p-3">
      <div className="col-xl-8 text-start mb-3">
        <Categories />
      </div>
      <div className="col-xl-4 text-end mb-3">
        <Sort />
      </div>
    </div>
    <ItemsList />
  </div>
);

export default Main;
