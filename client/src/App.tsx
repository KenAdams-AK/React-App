import { ActivityLog } from "./components/ActivityLog";
import { Button } from "./components/ui/button";
import { TaskList } from "./components/TaskList";
import { useUser } from "./hooks/useUser";

function App() {
  const user = useUser();

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="p-1 space-y-5 text-center">
      <h1 className="text-3xl font-bold text-sky-500">
        Welcome to Task Board, {user.username}!
      </h1>
      <Button>Click me</Button>
      <ActivityLog />
      <TaskList />
    </main>
  );
}

export default App;
