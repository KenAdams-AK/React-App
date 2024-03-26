import { ActivityLog } from "./components/ActivityLog";
import { TaskList } from "./components/TaskList";
import { useUser } from "./hooks/useUser";

function App() {
  const user = useUser();

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <h1>Welcome to Task Board, {user.username}!</h1>
      <ActivityLog />
      <TaskList />
    </main>
  );
}

export default App;
