import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => history.goBack()}
    >
      <i className="bi bi-caret-left me-1" />
      Назад
    </button>
  );
};

export default BackButton;
