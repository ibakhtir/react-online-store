import React from "react";
import PropTypes from "prop-types";

import Table from "../table/table";
import Modal from "../common/modal";

const ItemsTable = ({ items, onRemove }) => {
  const columns = [
    {
      path: "name",
      name: "Наименование",
      content: (item) => item.name
    },
    {
      path: "description",
      name: "Описание",
      content: (item) => item.description
    },
    {
      path: "imageUrl",
      name: "Изображение",
      content: (item) => (
        <a href={item.imageUrl} target="_blanc" className="text-muted">
          Ссылка
        </a>
      )
    },
    {
      path: "dough",
      name: "Тесто",
      content: (item) => item.dough
    },
    {
      path: "size",
      name: "Размер",
      content: (item) => item.size
    },
    {
      path: "weight",
      name: "Вес",
      content: (item) => item.weight
    },
    {
      path: "calories",
      name: "Калории",
      content: (item) => item.calories
    },
    {
      path: "price",
      name: "Цена",
      content: (item) => item.price
    },
    {
      path: "action",
      name: "Действие",
      content: (item) => (
        <div className="d-flex justify-content-around">
          <Modal item={item} />
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onRemove(item.id)}
          >
            <i className="bi bi-trash" />
          </button>
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
