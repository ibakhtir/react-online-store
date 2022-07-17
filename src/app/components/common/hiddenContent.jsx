import React, { useState } from "react";
import PropTypes from "prop-types";

const HiddenContent = ({ content, maxWidth }) => {
  const [showContent, setShowContent] = useState(false);

  const getContentStyle = () => {
    if (showContent) {
      return {
        maxWidth,
        whiteSpace: "normal",
        overflow: "unset",
        cursor: "pointer"
      };
    }
    return {
      maxWidth,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      cursor: "pointer"
    };
  };

  const handleShowContent = () => {
    setShowContent((prevState) => !prevState);
  };

  return (
    <p
      aria-hidden="true"
      className="mb-0"
      style={getContentStyle()}
      onClick={handleShowContent}
    >
      {content}
    </p>
  );
};

HiddenContent.propTypes = {
  content: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default HiddenContent;
