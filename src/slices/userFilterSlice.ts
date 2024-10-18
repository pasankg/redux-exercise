import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types";
import { userApi } from "../quries";
import { isEmpty, isNull, size } from "lodash"

interface UserState {
  users: UserType[];
  filteredUsers: UserType[];
  selectedGenders: string[];
  selectedAgeRange: number[];
  filteredNames: string[];
  nameFilters: object[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  filteredNames: [],
  nameFilters: [],
  selectedGenders: ['male', 'female'],
  selectedAgeRange: [20, 65],
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

      const filteredNames = state.filteredNames.length
        ? state.filteredNames
        : state.nameFilters.map((filter) => filter.value);

      console.log(JSON.stringify(filteredNames));

      state.filteredUsers = state.users.filter(
        user =>
          selectedGenders.includes(user.gender) &&
          (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]) &&
          filteredNames.includes(user.username)
      );

    },
    setUserData: (state, action: PayloadAction<UserType[]>) => {
      const activeUserData = action.payload ?? [];
      state.users = activeUserData;
      state.filteredUsers = state.users.filter(user => state.selectedGenders.includes(user.gender) &&
        (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]));
      state.nameFilters = state.users.map(user => { return { 'label': user.firstName, 'value': user.firstName } })
    },
    setUserNameFilters: (state, action: PayloadAction<string[]>) => {
      const nameFilters = action.payload;
      state.filteredNames = nameFilters;
      if (size(state.filteredUsers) > 0) {
        state.filteredUsers = state.users.filter(
          user => nameFilters.includes(user.username) &&
            (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]) &&
            state.selectedGenders.includes(user.gender)
        )
      }
      else {
        state.filteredUsers = state.users.filter(
          user => (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]) &&
            state.selectedGenders.includes(user.gender)
        )
      }
    },
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
      state.nameFilters = state.users.map(user => { return { 'label': user.firstName, 'value': user.username } })
      console.log('matchFulfilled');
    });
    builder.addMatcher(userApi.endpoints.getUsers.matchRejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch users';
      console.log('matchRejected');
    });
  }

})

export const { filterByGender, setUserData, setUserNameFilters } = userSlice.actions;
export default userSlice.reducer;