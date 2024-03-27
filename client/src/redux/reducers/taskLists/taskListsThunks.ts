import {
  CreateTaskListRequest,
  TaskListResponse,
  UpdateTaskListRequest,
} from "task-board-app-contracts";

import { actionTypes } from "@/redux/actionTypes";
import { apiRoutes } from "@/redux/apiRoutes";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchTaskLists = createAsyncThunk<TaskListResponse[]>(
  actionTypes.fetchTaskList,
  async (_args, { signal }) => {
    const options = {
      url: apiRoutes.fetchTaskLists,
      method: "GET",
      signal,
    };
    const { data } = await axios(options);

    return data;
  }
);

const postTaskList = createAsyncThunk<TaskListResponse, CreateTaskListRequest>(
  actionTypes.postTaskList,
  async (body, { signal }) => {
    const options = {
      url: apiRoutes.postTaskList,
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

const patchTaskList = createAsyncThunk<
  TaskListResponse,
  { id: string; body: UpdateTaskListRequest }
>(actionTypes.patchTaskList, async ({ id, body }, { signal }) => {
  const options = {
    url: apiRoutes.patchTaskList(id),
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

const deleteTaskList = createAsyncThunk<TaskListResponse, string>(
  actionTypes.deleteTaskList,
  async (id, { signal }) => {
    const options = {
      url: apiRoutes.deleteTaskList(id),
      method: "DELETE",
      signal,
    };
    const { data } = await axios(options);

    return data;
  }
);

export { fetchTaskLists, postTaskList, patchTaskList, deleteTaskList };
