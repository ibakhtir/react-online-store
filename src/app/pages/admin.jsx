import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/common/modal";
import ItemsTable from "../components/ui/itemsTable";
import { getItems, removeItem } from "../store/items";

const Admin = () => {
  const items = useSelector(getItems());
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-start mb-3">
        <Modal />
      </div>
      {items && <ItemsTable items={items} onRemove={handleRemoveItem} />}
    </div>
  );
};

export default Admin;
