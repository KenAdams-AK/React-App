import { Board } from "@/components/Board";
import { useTaskLists } from "@/hooks/useTaskLists";
import { useUser } from "@/hooks/useUser";

export function HomePage() {
  const user = useUser();
  const { taskLists } = useTaskLists();

  if (!user || !taskLists) {
    return <h1>Loading...</h1>;
  }

  return <Board taskLists={taskLists} />;
}
