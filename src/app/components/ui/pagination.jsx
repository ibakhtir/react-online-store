import React from "react";
import PropTypes from "prop-types";

import usePagination, { dots } from "../../hooks/usePagination";

const Pagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
  onPageChange
}) => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage
  });

  // Если меньше двух страниц, не отображаем компонент
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mt-3 p-2">
        <li className="page-item">
          <button
            type="button"
            className="page-link"
            onClick={onPrevious}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left" />
          </button>
        </li>
        {paginationRange.map((pageNumber) =>
          pageNumber === dots ? (
            <li key={`page_dots${pageNumber}`} className="page-item">
              <button type="button" className="page-link" disabled>
                {dots}
              </button>
            </li>
          ) : (
            <li
              key={`page_${pageNumber}`}
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          )
        )}
        <li className="page-item">
          <button
            type="button"
            className="page-link"
            onClick={onNext}
            disabled={currentPage === lastPage}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  pageSize: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func
};

export default Pagination;
