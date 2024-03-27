const API_HOST = import.meta.env.VITE_API_HOST;
const BASE_URL = import.meta.env.MODE === "development" ? "" : API_HOST;

export const apiRoutes = {
  fetchUser: `${BASE_URL}/api/user`,
  fetchActivityLog: `${BASE_URL}/api/activity-log`,

  fetchTaskLists: `${BASE_URL}/api/task-lists`,
  postTaskList: `${BASE_URL}/api/task-lists`,
  patchTaskList: (id: string) => `${BASE_URL}/api/task-lists/${id}`,
  deleteTaskList: (id: string) => `${BASE_URL}/api/task-lists/${id}`,

  fetchTaskById: (id: string) => `${BASE_URL}/api/tasks/${id}`,
  postTask: `${BASE_URL}/api/tasks`,
  patchTask: (id: string) => `${BASE_URL}/api/tasks/${id}`,
  deleteTask: (id: string) => `${BASE_URL}/api/tasks/${id}`,
};
