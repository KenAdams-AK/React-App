import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { InitialState } from "./tasksSlice";
import { fetchTaskById } from "./tasksThunks";

// TODO: Add cases for postTask, patchTask, and deleteTask
const extraReducers = (builder: ActionReducerMapBuilder<InitialState>) => {
  builder.addCase(fetchTaskById.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(fetchTaskById.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.task = payload;
  });

  builder.addCase(fetchTaskById.rejected, (state, { error }) => {
    if (error.name === "AbortError") {
      console.warn("[FETCH_TASK]", error);
      return;
    }
    state.isLoading = false;
    state.error = error.message ?? "An error occurred. Please try again later.";
    console.error("[FETCH_TASK]", error);
  });
};

export { extraReducers };
