import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setUser(data[0]);
      })
      .catch((error) => console.log("[FETCH_ERROR]", error));
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return <h1>Welcome to Task Board, {user.name}!</h1>;
}

export default App;
