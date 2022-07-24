import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import commentService from "../services/comment.service";

const initialState = {
  entities: null,
  isLoading: true,
  error: null
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c.id !== action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateFailed = createAction("comments/commentCreateFailed");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveFailed = createAction("comments/commentRemoveFailed");

export function createComment(payload) {
  return async (dispatch) => {
    dispatch(commentCreateRequested(payload));
    try {
      const comment = {
        ...payload,
        id: nanoid(),
        created_at: Date.now()
      };
      const { content } = await commentService.create(comment);
      dispatch(commentCreated(content));
    } catch (error) {
      dispatch(commentCreateFailed(error.message));
    }
  };
}

export function removeComment(commentId) {
  return async (dispatch) => {
    dispatch(commentRemoveRequested(commentId));
    try {
      const { content } = await commentService.remove(commentId);
      if (content === null) {
        dispatch(commentRemoved(commentId));
      }
    } catch (error) {
      dispatch(commentRemoveFailed(error.message));
    }
  };
}

export function loadCommentsList(itemId) {
  return async (dispatch) => {
    dispatch(commentsRequested());
    try {
      const { content } = await commentService.get(itemId);
      dispatch(commentsReceived(content));
    } catch (error) {
      dispatch(commentsRequestFailed(error.message));
    }
  };
}

export function getCommentsLoadingStatus() {
  return (state) => state.comments.isLoading;
}

export function getComments() {
  return (state) => state.comments.entities;
}

export default commentsReducer;
