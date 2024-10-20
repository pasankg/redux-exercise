import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types";
import { userApi } from "../quries";
import { size } from "lodash"
import dayjs from "dayjs";

interface UserState {
  users: UserType[];
  filteredUsers: UserType[];
  selectedGenders: string[];
  selectedAgeRange: number[];
  filteredNames: string[];
  dateOfBirthFilter: string[];
  nameFilters: object[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  filteredNames: [],
  dateOfBirthFilter: ['1900-01-01', dayjs().format('YYYY-M-D')],
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

      state.filteredUsers = state.users.filter(
        user =>
          selectedGenders.includes(user.gender) &&
          (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]) &&
          filteredNames.includes(user.username) &&
          (user.birthDate >= state.dateOfBirthFilter[0] && user.birthDate <= state.dateOfBirthFilter[1])
      );

    },
    // setUserData: (state, action: PayloadAction<UserType[]>) => {
    //   const activeUserData = action.payload ?? [];
    //   state.users = activeUserData;
    //   state.filteredUsers = state.users.filter(user => state.selectedGenders.includes(user.gender) &&
    //     (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]));
    //   state.nameFilters = state.users.map(user => { return { 'label': user.firstName, 'value': user.firstName } })
    // },
    setUserNameFilters: (state, action: PayloadAction<string[]>) => {
      const nameFilters = action.payload;
      state.filteredNames = nameFilters;
      if (size(state.filteredUsers) > 0) {
        state.filteredUsers = state.users.filter(
          user => state.filteredNames.includes(user.username) &&
            (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]) &&
            state.selectedGenders.includes(user.gender) &&
            (user.birthDate >= state.dateOfBirthFilter[0] && user.birthDate <= state.dateOfBirthFilter[1])
        )
      }
      else {
        state.filteredUsers = state.users.filter(
          user =>
            (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]) &&
            state.selectedGenders.includes(user.gender) &&
            (user.birthDate >= state.dateOfBirthFilter[0] && user.birthDate <= state.dateOfBirthFilter[1])
        );
      }
    },
    setAgeFilters: (state, action: PayloadAction<number[]>) => {
      const ageRange = action.payload;
      const filteredNames = state.filteredNames.length === 0
        ? state.users.map((user) => user.username)
        : state.filteredNames.map((filter) => filter.value);

      const selectedGenders = state.selectedGenders.length ? state.selectedGenders.map((filter) => filter) : [];
      state.selectedAgeRange = ageRange;
      state.filteredUsers = state.users.filter(
        user =>
          (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1]) &&
          filteredNames.includes(user.username) &&
          selectedGenders.includes(user.gender) &&
          (user.birthDate >= state.dateOfBirthFilter[0] && user.birthDate <= state.dateOfBirthFilter[1])
      )
    },
    setDateOfBirthFilter: (state, action: PayloadAction<string[]>) => {
      const dateRange = action.payload;
      state.dateOfBirthFilter = dateRange;

      const filteredNames = state.filteredNames.length === 0
        ? state.users.map((user) => user.username)
        : state.filteredNames.map((filter) => filter.value);

      const selectedGenders = state.selectedGenders.length ? state.selectedGenders.map((filter) => filter) : [];

      state.filteredUsers = state.users.filter(
        user =>
          (user.birthDate >= state.dateOfBirthFilter[0] && user.birthDate <= state.dateOfBirthFilter[1]) &&
          filteredNames.includes(user.username) &&
          selectedGenders.includes(user.gender) &&
          (user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1])
      )
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
      state.filteredUsers = state.users.filter(user => user.age >= state.selectedAgeRange[0] && user.age <= state.selectedAgeRange[1])
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

export const { filterByGender, setUserData, setUserNameFilters, setAgeFilters, setDateOfBirthFilter } = userSlice.actions;
export default userSlice.reducer;