import { useEffect, useState } from "react";

import { UserResponse } from "../../server/contracts/index";

function App() {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setUser(data);
      })
      .catch((error) => console.log("[FETCH_ERROR]", error));
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return <h1>Welcome to Task Board, {user.username}!</h1>;
}

export default App;
