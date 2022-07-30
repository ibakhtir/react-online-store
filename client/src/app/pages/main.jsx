import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

import scrollTo from "../utils/scrollTo";
import Categories from "../components/ui/filterGroup/categories";
import Sort from "../components/ui/filterGroup/sort";
import ItemCard from "../components/ui/itemCard";
import Pagination from "../components/common/pagination";
import Slider from "../components/common/slider";
import ScrollToTop from "../components/common/scrollToTop";
import Footer from "../components/common/footer";
import { getItems, getItemsLoadingStatus } from "../store/items";
import {
  getCategory,
  getSearchValue,
  getSortProperties
} from "../store/filter";

const pageSize = 8;

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const elRef = useRef(null);
  const position = elRef.current ? elRef.current.offsetTop - 54 : 0;

  const isLoading = useSelector(getItemsLoadingStatus());
  const items = useSelector(getItems());
  const category = useSelector(getCategory());
  const { path, order } = useSelector(getSortProperties());
  const searchValue = useSelector(getSearchValue());

  function getSearchItems(data, value) {
    if (value) {
      const foundItems = data.filter(
        (obj) => obj.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      if (foundItems.length !== 0) {
        scrollTo(position);
        return foundItems;
      }
      return data;
    }
    return data;
  }

  function getFilteredItems(data, category) {
    if (category.name !== "Все") {
      return data.filter((obj) => obj.categories.includes(category._id));
    }
    return data;
  }

  const filteredItems = searchValue
    ? getSearchItems(items, searchValue)
    : getFilteredItems(items, category);

  const sortedItems = orderBy(filteredItems, [path], [order]);
  const itemsLength = filteredItems ? filteredItems.length : 0;

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
    scrollTo(position);
  };

  return (
    <>
      <ScrollToTop />
      <div className="container">
        <Slider />
        <span ref={elRef} />
        <div
          className="row align-items-center sticky-top p-3"
          style={{
            top: "70px",
            zIndex: 1,
            background: "rgba(255,255,255, 0.9)"
          }}
        >
          <div className="col-xl-8 text-start mb-2">
            <Categories position={position} />
          </div>
          <div className="col-xl-4 text-end mb-2">
            <Sort />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              {currentItems.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </div>
        <Pagination
          totalCount={itemsLength}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </>
  );
};

export default Main;
