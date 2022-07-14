import { useMemo } from "react";

import getRange from "../utils/getRange";

export const dots = "...";

const usePagination = ({
  totalCount, // общее к-во элементов
  pageSize, // к-во элементов на одной странице
  siblingCount = 1, // минимальное к-во страниц с каждой стороны от активной страницы
  currentPage // текущая активная страница
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize); // общее к-во страниц с элементами

    // общее к-во страниц, которые отображаются:
    // siblingCount + firstPage + lastPage + currentPage + 2*dots
    const totalPageNumbers = siblingCount + 5;

    // если к-во страниц для отображения меньше,
    // чем общее к-во страниц, то рендерим соответствующий диапазон
    if (totalPageNumbers >= totalPageCount) {
      return getRange(1, totalPageCount);
    }

    // вычисляем страницы слева и справа от активной страницы
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    // условия для отображения точек слева и справа от активной страницы
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // рендер диапазона, когда точки только справа
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = getRange(1, leftItemCount);
      return [...leftRange, dots, totalPageCount];
    }

    // рендер диапазона, когда точки только слева
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = getRange(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, dots, ...rightRange];
    }

    // рендер диапазона, когда точки слева и справа
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }

    return null;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
