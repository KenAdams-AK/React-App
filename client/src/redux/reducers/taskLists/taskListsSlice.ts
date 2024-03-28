import { TaskListResponse } from "task-board-app-contracts";
import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./taskListExtraReducers";

export type InitialState = {
  isLoading: boolean;
  error: Nullable<string>;
  taskLists: Nullable<TaskListResponse[]>;
  listTitles: Nullable<string[]>;
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  taskLists: null,
  listTitles: null,
};

const taskListSlice = createSlice({
  name: "taskLists",
  initialState,
  reducers: {},
  extraReducers,
});

const taskListReducer = taskListSlice.reducer;

export { taskListReducer };
