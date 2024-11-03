import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dateFormat, selectedGenders, selectedAgeRange } from '../constants'
import { userApi } from "../quries";
import { map } from "lodash"
import { dayjs } from "../vendor";


interface UserState {
  selectedGenders: string[];
  selectedAgeRange: number[];
  usernames: string[];
  selectedDateOfBirthFilter: string[];
  nameFilters: object[];
  filters: unknown;
}

const initialState: UserState = {
  usernames: [],
  selectedDateOfBirthFilter: [dayjs().year(1970).format(dateFormat), dayjs().format(dateFormat)],
  nameFilters: [],
  selectedGenders: selectedGenders,
  selectedAgeRange: selectedAgeRange,
  filters: {
    dateOfBirth: [dayjs().year(1970).format(dateFormat), dayjs().format(dateFormat)],
    ageRange: selectedAgeRange,
    gender: selectedGenders
  }
}

const userSlice = createSlice({
  name: "userFilters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<unknown>) => {
      state.filters = action.payload
    },
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
      state.filters = {
        ...state.filters,
        name: map(users, user => (user.username))
      }
      state.nameFilters = map(users, user => ({ label: user.firstName, value: user.username }))
      state.usernames = map(users, user => (user.username))
    });
  }

})

export const { setGenderFilter, setFilterUsername, setAgeRangeFilters, setFilterDateOfBirth, setFilters, reset } = userSlice.actions;
export default userSlice.reducer;