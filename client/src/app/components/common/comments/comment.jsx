import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import displayDate from "../../../utils/displayDate";
import { getCurrentUserId, getUserById } from "../../../store/users";
import { removeComment } from "../../../store/comments";

const Comment = ({ comment }) => {
  const { _id, content, createdAt, userId, isRecommend } = comment;

  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  const dispatch = useDispatch();

  const handleRemoveComment = () => {
    dispatch(removeComment(_id));
  };

  return (
    user && (
      <div className="bg-light card-body rounded mb-2">
        <div className="d-flex flex-start">
          <img
            src={user.image}
            className="rounded-circle me-3"
            alt="avatar"
            width="60"
            height="60"
          />
          <div className="flex-grow-1 flex-shrink-1">
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0">
                {user.name}
                <span className="small text-muted">
                  {` - ${displayDate(createdAt)}`}
                </span>
              </p>
              {currentUserId === userId && (
                <button
                  type="button"
                  aria-label="Close button"
                  className="btn btn-close"
                  onClick={handleRemoveComment}
                />
              )}
            </div>
            <p className="small mb-0 mt-1">{content}</p>
            <p className="text-end mb-0 me-1">
              {isRecommend === "yes" ? (
                <i className="bi bi-emoji-smile text-success" />
              ) : (
                <i className="bi bi-emoji-frown text-danger" />
              )}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

Comment.propTypes = {
  comment: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};

export default Comment;
