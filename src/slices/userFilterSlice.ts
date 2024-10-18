import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types";
import { userApi } from "../quries";

interface UserState {
 users: UserType[];
 filteredUsers: UserType[];
 selectedGenders: string[];
 selectedAgeRange: number[];
 loading: boolean;
 error: string | null;
}

const initialState: UserState = {
 users: [],
 filteredUsers: [],
 selectedGenders: ['male', 'female'],
 selectedAgeRange: [20, 36],
 loading: false,
 error: null,
}

const userSlice = createSlice({
 name: "userFilters",
 initialState,
 reducers: {
  filterByGender: (state, action: PayloadAction<string[]>) => {
   const selectedGenders = action.payload;
   state.selectedGenders = selectedGenders;
   state.filteredUsers = state.users.filter(user => selectedGenders.includes(user.gender));
  },
  setUserData: (state, action: PayloadAction<UserType[]>) => {
   const activeUserData = action.payload ?? [];
   state.users = activeUserData;
   state.filteredUsers = state.users.filter(user => state.selectedGenders.includes(user.gender) &&
    user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]);
  }
 },
 extraReducers: (builder) => {
  builder.addMatcher(userApi.endpoints.getUsers.matchPending, (state) => {
   state.loading = true;
   console.log('matchPending');
  });
  builder.addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, action) => {
   state.loading = false;
   state.users = action.payload?.users;
   state.filteredUsers = action.payload?.users;
   console.log('matchFulfilled');   
  });
  builder.addMatcher(userApi.endpoints.getUsers.matchRejected, (state, action) => {
   state.loading = false;
   state.error = action.error.message || 'Failed to fetch users';
   console.log('matchRejected');
  });
 }

})

export const { filterByGender, setUserData } = userSlice.actions;
export default userSlice.reducer;