import { useAppDispatch, useAppSelector } from "@/redux/store";

import { ActivityLogResponse } from "task-board-app-contracts";
import { fetchActivityLog } from "@/redux/reducers/activityLog/activityLogSlice";
import { useEffect } from "react";

export function useActivityLog(): {
  isLoading: boolean;
  error: Nullable<string>;
  activityLog: Nullable<ActivityLogResponse[]>;
} {
  const dispatch = useAppDispatch();
  const { isLoading, error, activityLog } = useAppSelector(
    (state) => state.activityLog
  );

  useEffect(() => {
    if (activityLog) return;
    const promise = dispatch(fetchActivityLog());

    return () => {
      promise.abort();
    };
  }, []);

  return { isLoading, error, activityLog } as const;
}
