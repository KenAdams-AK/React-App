import { Button } from "./ui/button";
import { Dots } from "./ui/dots";
import { Separator } from "@/components/ui/separator";
import { TaskCard } from "./TaskCard";
import { TaskListResponse } from "task-board-app-contracts";

type TaskListProps = {
  listData: TaskListResponse;
};

export function TaskList({ listData }: TaskListProps) {
  console.log({ listData });

  const { title, tasks } = listData;

  return (
    <li className="flex-col">
      <Separator />
      <h2 className="flex justify-between m-2">
        {title}
        <span className="flex items-center">
          {tasks?.length ?? 0}
          <Dots className="ml-5 text-xl" />
        </span>
      </h2>
      <Separator />
      <Button className="w-full my-2 bg-transparent border-2 border-dashed text-inherit hover:text-background">
        Add new card
      </Button>
      <ul>
        {tasks &&
          tasks.map((task) => <TaskCard key={task.id} taskData={task} />)}
      </ul>
    </li>
  );
}
