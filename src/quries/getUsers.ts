import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../types";

export const userApi = createApi({
 reducerPath: 'userApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
 endpoints: (builder) => ({
  getUsers: builder.query<UserType[], void>({
   query: () => `users`
  }),
 }),
})


// a hook name always start with `use`
// a RTK Query name must end with `Query`, hence this is a query hook the `getUsers` must be written as follows;
export const { useGetUsersQuery } = userApi