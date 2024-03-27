import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ActionReducerMapBuilder } from "@reduxjs/toolkit/react";
import { UserResponse } from "@contracts/index";
import { actionTypes } from "@/redux/actionTypes";
import { apiRoutes } from "@/redux/apiRoutes";
import axios from "axios";

type InitialState = {
  user: Nullable<UserResponse>;
};

const initialState: InitialState = {
  user: null,
};

const fetchUser = createAsyncThunk<UserResponse>(
  actionTypes.fetchUser,
  async (_args, { signal }) => {
    const { data } = await axios(apiRoutes.fetchUser, { signal });
    return data;
  }
);

const extraReducers = (builder: ActionReducerMapBuilder<InitialState>) => {
  builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
    state.user = payload;
  });

  builder.addCase(fetchUser.rejected, (_state, { error }) => {
    if (error.name === "AbortError") {
      console.warn("[FETCH_USER]", error);
      return;
    }
    console.error("[FETCH_USER]", error);
  });
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers,
});

const userReducer = userSlice.reducer;

export { userReducer, fetchUser };
