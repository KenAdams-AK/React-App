import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { InitialState } from "./taskListsSlice";
import { fetchTaskLists } from "./taskListsThunks";

const extraReducers = (builder: ActionReducerMapBuilder<InitialState>) => {
  builder.addCase(fetchTaskLists.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(fetchTaskLists.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.taskLists = payload;
  });

  builder.addCase(fetchTaskLists.rejected, (state, { error }) => {
    if (error.name === "AbortError") {
      console.warn("[FETCH_TASK_LISTS]", error);
      return;
    }
    state.isLoading = false;
    state.error = error.message ?? "An error occurred. Please try again later.";
    console.error("[FETCH_TASK_LISTS]", error);
  });
};

export { extraReducers };
