import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";

import Alert from "../components/common/alert";
import Modal from "../components/common/modal";
import ItemsTable from "../components/ui/itemsTable";
import Pagination from "../components/ui/pagination";
import { getItems, getItemsLoadingStatus, removeItem } from "../store/items";
import { getTableSortProperties } from "../store/filter";
import { getAlert, setAlert } from "../store/alerts";

const pageSize = 4;

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const isLoading = useSelector(getItemsLoadingStatus());
  const items = useSelector(getItems());
  const { path, order } = useSelector(getTableSortProperties());
  const alert = useSelector(getAlert());

  const dispatch = useDispatch();

  useEffect(() => {
    const handleShowAlert = () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        dispatch(setAlert({}));
      }, 3000);
    };
    if (Object.keys(alert).length > 0) {
      handleShowAlert();
    }
  }, [alert, dispatch]);

  const sortedItems = orderBy(items, [path], [order]);

  const currentItems = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return !isLoading && sortedItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, isLoading, sortedItems]);

  useEffect(() => {
    if (!isLoading && items.length <= pageSize) {
      setCurrentPage(1);
    }
  }, [items, isLoading]);

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
      {!isLoading && (
        <>
          <ItemsTable items={currentItems} onRemove={handleRemoveItem} />
          <Pagination
            totalCount={items.length}
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
