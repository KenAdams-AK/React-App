import { ActionTypes } from "../actionTypes";
import { ApiRoutes } from "../apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

function createGetThunk<T>(action: ActionTypes) {
  return createAsyncThunk<T, { apiRoute: ApiRoutes }>(
    action,
    async (args, { signal }) => {
      const { apiRoute } = args;

      const res = await fetch(apiRoute, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });

      return res.json();
    }
  );
}

export { createGetThunk };
