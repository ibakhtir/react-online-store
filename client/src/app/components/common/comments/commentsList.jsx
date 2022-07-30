import React from "react";
import PropTypes from "prop-types";

import Preloader from "../preloader";

import Comment from "./comment";

const CommentsList = ({ comments, isLoading }) => (
  <div className="card mb-4">
    <div className="card-body">
      <h3>Отзывы</h3>
      <hr />
      {!isLoading ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <Preloader color="warning" />
      )}
    </div>
  </div>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
  isLoading: PropTypes.bool
};

export default CommentsList;
