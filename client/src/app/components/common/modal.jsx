import React, { useState } from "react";
import PropTypes from "prop-types";

import EditItemForm from "../ui/editItemForm";
import AddItemForm from "../ui/addItemForm";

import TapButton from "./buttons/tapButton";

const Modal = ({ item }) => {
  const [showModal, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      {item ? (
        <TapButton
          type="button"
          color="warning"
          rest="btn-sm"
          onClick={handleShow}
        >
          <i className="bi bi-pencil" />
        </TapButton>
      ) : (
        <TapButton type="button" color="success" onClick={handleShow}>
          <i className="bi bi-plus-circle-fill me-2" />
          Добавить новый товар
        </TapButton>
      )}
      <div className={`modal fade ${showModal ? "show d-block" : "d-none"}`}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {item ? "Редактирование" : "Создание"}
              </h5>
              <button
                type="button"
                aria-label="Close button"
                className="btn btn-close"
                onClick={handleClose}
              />
            </div>
            <div className="modal-body">
              {item ? (
                <EditItemForm item={item} onClose={handleClose} />
              ) : (
                <AddItemForm onClose={handleClose} />
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show" />}
    </>
  );
};

Modal.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
  )
};

export default Modal;
