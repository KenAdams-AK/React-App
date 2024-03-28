import { ActivityLogResponse } from "task-board-app-contracts";
import { formatDate } from "@/helpers/dateFormater";

type LogItemProps = {
  log: ActivityLogResponse;
};

export function LogItem({ log }: LogItemProps) {
  return (
    <li className="my-3" key={log.id}>
      <p>{log.action}</p>
      <p>{formatDate(log.createdAt)}</p>
    </li>
  );
}
