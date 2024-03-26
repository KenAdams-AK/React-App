export const actionTypes = {
  fetchUser: "user/fetchUser",
} as const;

// type Keys = typeof actionTypes;
// type Values = (typeof actionTypes)[keyof Keys];
// export type ActionTypes = Values;

export type ActionTypes = typeof actionTypes;
