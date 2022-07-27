import React from "react";
import PropTypes from "prop-types";

import Comment from "./comment";

const CommentsList = ({ comments }) => (
  <div className="card mb-4">
    <div className="card-body">
      <h3>Отзывы</h3>
      <hr />
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  </div>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  )
};

export default CommentsList;
