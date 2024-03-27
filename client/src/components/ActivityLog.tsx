import { useActivityLog } from "@/hooks/useActivityLog";

export function ActivityLog() {
  const { isLoading, error, activityLog } = useActivityLog();

  console.log({ activityLog });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return <div>ActivityLog</div>;
}
