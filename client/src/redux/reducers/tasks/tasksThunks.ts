import {
  CreateTaskRequest,
  TaskResponse,
  UpdateTaskRequest,
} from "task-board-app-contracts";

import { actionTypes } from "@/redux/actionTypes";
import { apiRoutes } from "@/redux/apiRoutes";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchTaskById = createAsyncThunk<TaskResponse, string>(
  actionTypes.fetchTaskById,
  async (id, { signal }) => {
    const options = {
      url: apiRoutes.fetchTaskById(id),
      method: "GET",
      signal,
    };
    const { data } = await axios(options);

    return data;
  }
);

const postTask = createAsyncThunk<TaskResponse, CreateTaskRequest>(
  actionTypes.postTask,
  async (body, { signal }) => {
    const options = {
      url: apiRoutes.postTask,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: body,
      signal,
    };
    const { data } = await axios(options);

    return data;
  }
);

const patchTask = createAsyncThunk<
  TaskResponse,
  { id: string; body: UpdateTaskRequest }
>(actionTypes.patchTask, async ({ id, body }, { signal }) => {
  const options = {
    url: apiRoutes.patchTask(id),
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: body,
    signal,
  };
  const { data } = await axios(options);

  return data;
});

const deleteTask = createAsyncThunk<TaskResponse, string>(
  actionTypes.deleteTask,
  async (id, { signal }) => {
    const options = {
      url: apiRoutes.deleteTask(id),
      method: "DELETE",
      signal,
    };
    const { data } = await axios(options);

    return data;
  }
);

export { fetchTaskById, postTask, patchTask, deleteTask };
