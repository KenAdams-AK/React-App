import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ActionReducerMapBuilder } from "@reduxjs/toolkit/react";
import { UserResponse } from "@contracts/index";
import { actionTypes } from "../../actionTypes";
import { apiRoutes } from "../../apiRoutes";

type InitialState = {
  user: Nullable<UserResponse>;
};

const initialState: InitialState = {
  user: null,
};

const fetchUserThunk = createAsyncThunk<UserResponse>(
  actionTypes.fetchUser,
  async (_args, { signal }) => {
    const res = await fetch(apiRoutes.fetchUser, { signal });

    return res.json();
  }
);

const extraReducers = (builder: ActionReducerMapBuilder<InitialState>) => {
  builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
    state.user = action.payload;
  });

  builder.addCase(fetchUserThunk.rejected, (_state, { error }) => {
    if (error.name === "AbortError") {
      console.warn("[FETCH_USER]", error.message);
      return;
    }
    console.error("[FETCH_USER]", error.message);
  });
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers,
});

const userReducer = userSlice.reducer;

export { userReducer, fetchUserThunk };
