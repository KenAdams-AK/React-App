import { Button } from "./ui/button";
import { History } from "./History";
import { TaskList } from "./TaskList";
import { TaskListResponse } from "task-board-app-contracts";

type BoardProps = {
  taskLists: TaskListResponse[];
};

export function Board({ taskLists }: BoardProps) {
  return (
    <>
      <header className="flex justify-between m-5">
        <h1 className="text-2xl font-bold">My Task Board</h1>
        <div>
          <History />
          <Button className="ml-5">Create New List</Button>
        </div>
      </header>

      <main className="mx-5 text-center">
        <ul className="flex gap-5">
          {taskLists.map((list) => (
            <TaskList key={list.id} listData={list} />
          ))}
        </ul>
      </main>
    </>
  );
}
