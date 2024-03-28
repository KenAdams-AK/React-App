import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { activityLogReducer } from "./reducers/activityLog/activityLogSlice";
import { taskListReducer } from "./reducers/taskLists/taskListsSlice";
import { taskReducer } from "./reducers/tasks/tasksSlice";
import { userReducer } from "./reducers/user/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  activityLog: activityLogReducer,
  taskLists: taskListReducer,
  task: taskReducer,
});

export function createReduxStore(initialState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}

const store = createReduxStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
