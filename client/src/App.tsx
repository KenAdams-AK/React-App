import { useAppDispatch, useAppSelector } from "./redux/store";

import { Button } from "./components/Button";
import { fetchUserThunk } from "./redux/reducers/user/userSlice";
import { useEffect } from "react";

function App() {
  // TODO: add useLocalStorage hook
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  console.log({ user });

  useEffect(() => {
    if (user) return;
    const promise = dispatch(fetchUserThunk());

    return () => {
      promise.abort();
    };
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <h1>Welcome to Task Board, {user.username}!</h1>
      <Button />
    </main>
  );
}

export default App;
