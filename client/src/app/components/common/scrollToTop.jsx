import React, { useEffect, useState } from "react";

import scrollTo from "../../utils/scrollTo";

const ScrollToTop = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 500) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    showScrollTopButton && (
      <button
        type="button"
        style={{ margin: "0 36px 110px 0", zIndex: 99 }}
        className="btn btn-warning position-fixed bottom-0 end-0 opacity-50"
        onClick={scrollTo}
      >
        <i className="bi bi-chevron-double-up" />
      </button>
    )
  );
};

export default ScrollToTop;
