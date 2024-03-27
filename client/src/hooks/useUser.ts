import { useAppDispatch, useAppSelector } from "@/redux/store";

import { UserResponse } from "@contracts/commands";
import { fetchUser } from "@/redux/reducers/user/userSlice";
import { useEffect } from "react";

export function useUser(): UserResponse | null {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) return;
    const promise = dispatch(fetchUser());

    return () => {
      promise.abort();
    };
  }, []);

  console.log({ user });

  return user;
}
