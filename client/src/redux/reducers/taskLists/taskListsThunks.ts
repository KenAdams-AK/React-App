import { TaskListResponse } from "@contracts/commands";
import { actionTypes } from "@/redux/actionTypes";
import { apiRoutes } from "@/redux/apiRoutes";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchTaskLists = createAsyncThunk<TaskListResponse[]>(
  actionTypes.fetchTaskList,
  async (_args, { signal }) => {
    const { data } = await axios(apiRoutes.fetchTaskLists, { signal });
    return data;
  }
);

const postTaskList = createAsyncThunk<TaskListResponse>(
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

export { fetchTaskLists, postTaskList };
