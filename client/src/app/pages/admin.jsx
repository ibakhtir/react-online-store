import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";

import Alert from "../components/common/alert";
import Modal from "../components/common/modal";
import Pagination from "../components/common/pagination";
import ItemsTable from "../components/ui/itemsTable";
import { getItems, getItemsLoadingStatus, removeItem } from "../store/items";
import { getTableSortProperties } from "../store/filter";
import { getItemAlert, setItemAlert } from "../store/alerts";

const pageSize = 6;

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const isLoading = useSelector(getItemsLoadingStatus());
  const items = useSelector(getItems());
  const { path, order } = useSelector(getTableSortProperties());
  const alert = useSelector(getItemAlert());

  const dispatch = useDispatch();

  useEffect(() => {
    const handleShowAlert = () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        dispatch(setItemAlert({}));
      }, 3000);
    };

    if (Object.keys(alert).length > 0) {
      handleShowAlert();
    }
  }, [alert, dispatch]);

  const sortedItems = orderBy(items, [path], [order]);
  const itemsLength = items ? items.length : 0;

  const currentItems = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return !isLoading && sortedItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, isLoading, sortedItems]);

  useEffect(() => {
    if (!isLoading && itemsLength <= pageSize) {
      setCurrentPage(1);
    }
  }, [isLoading, itemsLength]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="container mt-2">
      {showAlert && <Alert content={alert.content} color={`${alert.color}`} />}
      <div className="d-flex justify-content-start align-items-center mb-3">
        <Modal />
      </div>
      {currentItems.length > 0 && (
        <>
          <ItemsTable items={currentItems} onRemove={handleRemoveItem} />
          <Pagination
            totalCount={itemsLength}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Admin;
