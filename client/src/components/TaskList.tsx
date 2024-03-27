import { useTaskLists } from "@/hooks/useTaskLists";

export function TaskList() {
  const { isLoading, error, taskLists } = useTaskLists();

  console.log({ taskLists });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return <div>TaskList</div>;
}
