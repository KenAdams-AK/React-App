import { useAppDispatch, useAppSelector } from "@/redux/store";

import { TaskListResponse } from "task-board-app-contracts";
import { fetchTaskLists } from "@/redux/reducers/taskLists/taskListsThunks";
import { useEffect } from "react";

export function useTaskLists(): {
  isLoading: boolean;
  error: Nullable<string>;
  taskLists: Nullable<TaskListResponse[]>;
} {
  const dispatch = useAppDispatch();
  const { isLoading, error, taskLists } = useAppSelector(
    (state) => state.taskLists
  );

  useEffect(() => {
    if (taskLists) return;
    const promise = dispatch(fetchTaskLists());

    return () => {
      promise.abort();
    };
  }, []);

  return { isLoading, error, taskLists } as const;
}
