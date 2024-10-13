import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types";

interface UserState {
 users: UserType[];
 filteredUsers: UserType[];
 selectedGenders: string[];
}

const initialState: UserState = {
 users: [],
 filteredUsers: [],
 selectedGenders: ['Male', 'Female'],
}

const userSlice = createSlice({
 name: "userFilters",
 initialState,
 reducers: {
  filterByGender: (state, action: PayloadAction<string[]>) => {
   const selectedGenders = action.payload;
   state.selectedGenders = selectedGenders;
   state.filteredUsers = state.users.filter(user => selectedGenders.includes(user.gender));
  }
 }
})

export const { filterByGender } = userSlice.actions;
export default userSlice.reducer;