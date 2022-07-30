import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderBy } from "lodash";

import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from "../../store/comments";

const Comments = () => {
  const { itemId } = useParams();

  const comments = useSelector(getComments());
  const commentsLoadingStatus = useSelector(getCommentsLoadingStatus());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCommentsList(itemId));
  }, [dispatch, itemId]);

  const sortedComments = orderBy(comments, ["createdAt"], ["desc"]);

  return (
    <div className="px-3">
      <AddCommentForm />
      {sortedComments.length > 0 && (
        <CommentsList
          comments={sortedComments}
          isLoading={commentsLoadingStatus}
        />
      )}
    </div>
  );
};

export default Comments;
