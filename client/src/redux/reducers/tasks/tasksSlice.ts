import { TaskResponse } from "@contracts/commands";
import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./tasksExtraReducers";

export type InitialState = {
  isLoading: boolean;
  error: Nullable<string>;
  task: Nullable<TaskResponse>;
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  task: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers,
});

const taskReducer = taskSlice.reducer;

export { taskReducer };
