const API_HOST = import.meta.env.VITE_API_HOST;
const BASE_URL = import.meta.env.MODE === "development" ? "" : API_HOST;

export const apiRoutes = {
  fetchUser: `${BASE_URL}/api/user`,
};

// type Keys = typeof apiRoutes;
// type Values = (typeof apiRoutes)[keyof Keys];
// export type ApiRoutes = Values;

export type ApiRoutes = typeof apiRoutes;
