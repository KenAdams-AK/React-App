import "react-responsive-modal/styles.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Dots } from "./ui/dots";
import { TaskModal } from "./TaskModal";
import { TaskResponse } from "task-board-app-contracts";
import { formatDate } from "@/helpers/dateFormater";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";

type TaskCardProps = {
  taskData: TaskResponse;
};

export function TaskCard({ taskData }: TaskCardProps) {
  console.log({ taskData });
  const [isOpen, setIsOpen] = useState(false);
  const { listTitles } = useAppSelector((state) => state.taskLists);
  const { id, title, description, dueDate, priority } = taskData;
  const date = dueDate ? formatDate(dueDate) : "Not set";

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  return (
    <>
      <Card className="w-[300px] text-left" onClick={onOpenModal}>
        <CardHeader>
          <CardTitle className="flex justify-between">
            {title} <Dots />
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div>{date}</div>
          <div className="inline-block px-3 py-1 mt-2 rounded-md bg-slate-500">
            {priority}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Move to:" />
            </SelectTrigger>
            <SelectContent position="popper">
              {listTitles?.map((title) => (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardFooter>
      </Card>

      {isOpen && (
        <TaskModal open={isOpen} onCloseModal={onCloseModal} taskId={id} />
      )}
    </>
  );
}
