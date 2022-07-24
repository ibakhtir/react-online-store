import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

import Categories from "../components/ui/filterGroup/categories";
import Sort from "../components/ui/filterGroup/sort";
import ItemCard from "../components/ui/itemCard";
import Pagination from "../components/common/pagination";
import Footer from "../components/common/footer";
import { getItems, getItemsLoadingStatus } from "../store/items";
import {
  getCategory,
  getSearchValue,
  getSortProperties
} from "../store/filter";

const pageSize = 4;

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = useSelector(getItemsLoadingStatus());
  const items = useSelector(getItems());
  const categoryId = useSelector(getCategory());
  const { path, order } = useSelector(getSortProperties());
  const searchValue = useSelector(getSearchValue());

  function getSearchItems(data, value) {
    if (value) {
      const foundItems = data.filter(
        (obj) => obj.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      if (foundItems.length !== 0) {
        return foundItems;
      }
      return data;
    }
    return data;
  }

  function getFilteredItems(data, categoryId) {
    if (categoryId !== "0") {
      return data.filter((obj) => obj.categories.includes(categoryId));
    }
    return data;
  }

  const filteredItems = searchValue
    ? getSearchItems(items, searchValue)
    : getFilteredItems(items, categoryId);

  const sortedItems = orderBy(filteredItems, [path], [order]);

  const currentItems = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return !isLoading && sortedItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, isLoading, sortedItems]);

  useEffect(() => {
    if (!isLoading && filteredItems.length <= pageSize) {
      setCurrentPage(1);
    }
  }, [filteredItems, isLoading]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {!isLoading && (
        <div className="container">
          <div className="row align-items-center p-3">
            <div className="col-xl-8 text-start mb-3">
              <Categories />
            </div>
            <div className="col-xl-4 text-end mb-3">
              <Sort />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center items-container">
            <div className="container">
              <div className="row">
                {currentItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          <Pagination
            totalCount={filteredItems.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Main;
