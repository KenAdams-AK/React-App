import { useAppDispatch, useAppSelector } from "@/redux/store";

import { Modal } from "react-responsive-modal";
import { fetchTaskById } from "@/redux/reducers/tasks/tasksThunks";
import { formatDate } from "@/helpers/dateFormater";
import { useEffect } from "react";

type TaskDialogProps = {
  open: boolean;
  onCloseModal: () => void;
  taskId: EntityId;
};

export function TaskModal({ open, onCloseModal, taskId }: TaskDialogProps) {
  console.log({ taskId });
  const dispatch = useAppDispatch();
  const { isLoading, task, error } = useAppSelector((state) => state.task);
  const dueDate = task?.dueDate ? formatDate(task.dueDate) : "Not set";

  const modal = {
    backgroundColor: "#f6f8fa",
    color: "#333",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "500px",
    width: "90%",
  };

  useEffect(() => {
    if (task && taskId === task?.id) return;
    const promise = dispatch(fetchTaskById(taskId));

    return () => {
      promise.abort();
    };
  }, [dispatch, task, taskId]);

  return (
    <Modal styles={{ modal }} open={open} onClose={onCloseModal} center>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Error: {error}</h2>}

      {task && (
        <>
          <h2>{task.title}</h2>
          <div>Status {task.status}</div>
          <div>Priority {task.priority}</div>
          <div>Due date {dueDate}</div>
          <div>Description {task.description}</div>
        </>
      )}
    </Modal>
  );
}
