import React from "react";
import PropTypes from "prop-types";

import Badge from "../common/badge";

const ItemInfo = ({ item }) => {
  const { size, weight, calories, price } = item;

  const info = [
    { id: "1", name: `${size} см` },
    { id: "2", name: `${weight} г` },
    { id: "3", name: `${calories} кал` },
    { id: "4", name: `${price} грн` }
  ];

  return (
    item && (
      <div className="card-body p-2 mb-2">
        {info.map((obj) => (
          <Badge key={obj.id} data={obj.name} color="warning" rest="p-2 m-1" />
        ))}
      </div>
    )
  );
};

ItemInfo.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
  )
};

export default ItemInfo;
