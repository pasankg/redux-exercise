import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../types";

export const userApi = createApi({
 reducerPath: 'userApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
 endpoints: (builder) => ({
  getUsers: builder.query<UserType[], void>({
   query: () => `users`,
   // Use `transformResponse` to extract the `users` array from the API response
   transformResponse: (response: { users: UserType[], total: number, skip: number, limit: number }) => response.users
  }),
 }),
})


// a hook name always start with `use`
// a RTK Query name must end with `Query`, hence this is a query hook the `getUsers` must be written as follows;
export const { useGetUsersQuery } = userApi