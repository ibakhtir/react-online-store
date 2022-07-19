import { createAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { MAIN_ROUTE } from "../utils/constants";
import generateAuthErrors from "../utils/generateAuthErrors";
import createAvatar from "../utils/createAvatar";
import history from "../utils/history";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import {
  setTokens,
  getAccessToken,
  getUserId,
  removeAuthData
} from "../services/localStorage.service";

const initialStateNotAuth = {
  entities: null,
  isLoading: true,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
};

const initialStateAuth = {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: getUserId() },
  isLoggedIn: true,
  dataLoaded: false
};

const initialState = getAccessToken() ? initialStateAuth : initialStateNotAuth;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccessed: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
    authRequested: (state) => {
      state.error = null;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccessed,
  authRequestFailed,
  userCreated,
  userLoggedOut
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");

function createUser(payload) {
  return async (dispatch) => {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}

export function signUp({ email, password, ...rest }) {
  return async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      setTokens(data);
      dispatch(authRequestSuccessed({ userId: data.localId }));
      dispatch(
        createUser({
          id: data.localId,
          email,
          image: createAvatar("croodles-neutral"),
          ...rest
        })
      );
      history.push(MAIN_ROUTE);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthErrors(message);
        toast.error(errorMessage);
        dispatch(authRequestFailed(errorMessage));
      } else {
        toast.error("Неизвестная ошибка");
        dispatch(authRequestFailed(error.message));
      }
    }
  };
}

export function signIn({ email, password }) {
  return async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      setTokens(data);
      dispatch(authRequestSuccessed({ userId: data.localId }));
      history.push(MAIN_ROUTE);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthErrors(message);
        toast.error(errorMessage);
        dispatch(authRequestFailed(errorMessage));
      } else {
        toast.error("Неизвестная ошибка");
        dispatch(authRequestFailed(error.message));
      }
    }
  };
}

export function signOut() {
  return (dispatch) => {
    removeAuthData();
    dispatch(userLoggedOut());
    history.push(MAIN_ROUTE);
  };
}

export function loadUsersList() {
  return async (dispatch) => {
    dispatch(usersRequested());
    try {
      const { content } = await userService.get();
      dispatch(usersReceived(content));
    } catch (error) {
      dispatch(usersRequestFailed(error.message));
    }
  };
}

export function getUserById(userId) {
  return (state) =>
    state.users.entities && state.users.entities.find((u) => u.id === userId);
}

export function getCurrentUserId() {
  return (state) => state.users?.auth?.userId;
}

export function getDataLoadedStatus() {
  return (state) => state.users.dataLoaded;
}

export function getIsLoggedIn() {
  return (state) => state.users.isLoggedIn;
}

export default usersReducer;
