import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { ActivityLogResponse } from "@contracts/index";
import { actionTypes } from "@/redux/actionTypes";
import { apiRoutes } from "@/redux/apiRoutes";
import axios from "axios";

type InitialState = {
  isLoading: boolean;
  error: Nullable<string>;
  activityLog: Nullable<ActivityLogResponse[]>;
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  activityLog: null,
};

const fetchActivityLog = createAsyncThunk<ActivityLogResponse[]>(
  actionTypes.fetchActivityLog,
  async (_args, { signal }) => {
    const { data } = await axios(apiRoutes.fetchActivityLog, { signal });
    return data;
  }
);

const extraReducers = (builder: ActionReducerMapBuilder<InitialState>) => {
  builder.addCase(fetchActivityLog.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(fetchActivityLog.fulfilled, (state, action) => {
    state.isLoading = false;
    state.activityLog = action.payload;
  });

  builder.addCase(fetchActivityLog.rejected, (state, { error }) => {
    if (error.name === "AbortError") {
      console.warn("[FETCH_ACTIVITY_LOG]", error);
      return;
    }
    state.isLoading = false;
    state.error = error.message ?? "An error occurred. Please try again later.";
    console.error("[FETCH_ACTIVITY_LOG]", error);
  });
};

const activityLogSlice = createSlice({
  name: "activityLog",
  initialState,
  reducers: {},
  extraReducers,
});

const activityLogReducer = activityLogSlice.reducer;

export { activityLogReducer, fetchActivityLog };
