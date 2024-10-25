import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserType } from "../types";
import { userApi } from "../quries";
import { map } from "lodash"
import { dayjs } from "../vendor";

const dateFormat = "YYYY-M-D";
interface UserState {
  // users: UserType[];
  // filteredUsers: UserType[];
  selectedGenders: string[];
  selectedAgeRange: number[];
  usernames: string[];
  selectedDateOfBirthFilter: string[];
  nameFilters: object[];
  // loading: boolean;
  // error: string | null;
}

const initialState: UserState = {
  // users: [],
  // filteredUsers: [],
  usernames: [],
  selectedDateOfBirthFilter: [dayjs().year(1970).format(dateFormat), dayjs().format(dateFormat)],
  nameFilters: [],
  selectedGenders: ['male', 'female'],
  selectedAgeRange: [20, 65],
  // loading: false,
  // error: null,
}

const userSlice = createSlice({
  name: "userFilters",
  initialState,
  reducers: {
    setGenderFilter: (state, action: PayloadAction<string[]>) => {
      const selectedGenders = action.payload;
      state.selectedGenders = selectedGenders;
    },
    setFilterUsername: (state, action: PayloadAction<string[]>) => {
      const selectedUsernames = action.payload;
      state.usernames = selectedUsernames;
    },
    setAgeRangeFilters: (state, action: PayloadAction<number[]>) => {
      const ageRange = action.payload;
      state.selectedAgeRange = ageRange;
    },
    setFilterDateOfBirth: (state, action: PayloadAction<string[]>) => {
      const dateRange = action.payload;
      state.selectedDateOfBirthFilter = dateRange;
    },
    reset: () => initialState, // Reset action that returns the initial state
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, action) => {
      const users = action.payload
      state.nameFilters = map(users, user => ({ label: user.firstName, value: user.username }))
      state.usernames = map(users, user => (user.username))
    });
  }

})

export const { setGenderFilter, setFilterUsername, setAgeRangeFilters, setFilterDateOfBirth, reset } = userSlice.actions;
export default userSlice.reducer;