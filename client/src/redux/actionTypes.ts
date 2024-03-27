export const actionTypes = {
  fetchUser: "user/fetchUser",
  fetchActivityLog: "activity/fetchActivityLog",

  fetchTaskList: "taskList/fetchTaskList",
  postTaskList: "taskList/postTaskList",
  patchTaskList: "taskList/patchTaskList",
  deleteTaskList: "taskList/deleteTaskList",

  fetchTaskById: "task/fetchTaskById",
  postTask: "task/postTask",
  patchTask: "task/patchTask",
  deleteTask: "task/deleteTask",
} as const;
