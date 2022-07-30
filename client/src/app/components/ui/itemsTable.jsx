import React from "react";
import PropTypes from "prop-types";

import Table from "../common/table/table";
import Modal from "../common/modal";
import HiddenContent from "../common/hiddenContent";
import TapButton from "../common/buttons/tapButton";

const ItemsTable = ({ items, onRemove }) => {
  const columns = [
    {
      path: "name",
      name: "Наименование",
      isSortable: true,
      style: "text-nowrap",
      content: (item) => item.name
    },
    {
      path: "description",
      name: "Описание",
      isSortable: false,
      style: "",
      content: (item) => (
        <HiddenContent content={item.description} maxWidth="300px" />
      )
    },
    {
      path: "imageUrl",
      name: "Изображение",
      isSortable: false,
      style: "",
      content: (item) => (
        <a href={item.imageUrl} target="_blanc" className="text-muted">
          Ссылка
        </a>
      )
    },
    {
      path: "dough",
      name: "Тесто",
      isSortable: true,
      style: "",
      content: (item) => item.dough.replace("тесто", "").trim()
    },
    {
      path: "size",
      name: "Размер",
      isSortable: true,
      style: "",
      content: (item) => item.size
    },
    {
      path: "weight",
      name: "Вес",
      isSortable: true,
      style: "",
      content: (item) => item.weight
    },
    {
      path: "calories",
      name: "Калории",
      isSortable: true,
      style: "",
      content: (item) => item.calories
    },
    {
      path: "price",
      name: "Цена",
      isSortable: true,
      style: "",
      content: (item) => item.price
    },
    {
      path: "action",
      name: "Действие",
      isSortable: false,
      style: "",
      content: (item) => (
        <div className="d-flex justify-content-center">
          <Modal item={item} />
          <TapButton
            type="button"
            color="danger"
            rest="btn-sm ms-2"
            onClick={() => onRemove(item._id)}
          >
            <i className="bi bi-trash" />
          </TapButton>
        </div>
      )
    }
  ];

  return (
    <div className="table-responsive">
      <Table items={items} columns={columns} />
    </div>
  );
};

ItemsTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    )
  ),
  onRemove: PropTypes.func
};

export default ItemsTable;
