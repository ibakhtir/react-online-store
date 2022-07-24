import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderBy } from "lodash";

import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import { getComments, loadCommentsList } from "../../store/comments";

const Comments = () => {
  const { itemId } = useParams();

  const comments = useSelector(getComments());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCommentsList(itemId));
  }, [dispatch, itemId]);

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <AddCommentForm />
      {sortedComments.length > 0 && <CommentsList comments={sortedComments} />}
    </>
  );
};

export default Comments;
