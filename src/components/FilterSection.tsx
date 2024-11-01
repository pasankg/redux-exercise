import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/system/Grid";
import {
  CheckboxFilter as GenderFilter,
  MultiSelectFilter as NameMultiSelect,
  DateFilter as DateOfBirthFilter,
  RangeFilter as AgeRangeFilter,
  Button,
} from "./shared";
import {
  setFilterUsername,
  setGenderFilter,
  setFilterDateOfBirth,
  setAgeRangeFilters,
  reset,
} from "../slices";

import {
  genderOptions,
  dateFormat,
  ageRangeOptions,
  buttonOptions,
} from "../constants";

const FilterSection: React.FC = () => {
  const dispatch = useDispatch();

  const nameFilterOptions = useSelector((state) => state.users.nameFilters);

  const handleOnChange = (type: string, value: unknown) => {
    switch (type) {
      case "radioSelect":
        dispatch(setGenderFilter(value as string[]));
        break;
      case "multiSelect":
        dispatch(setFilterUsername(value as string[]));
        break;
      case "dateRangeSelect":
        dispatch(setFilterDateOfBirth(value as string[]));
        break;
      case "rangeSelect":
        dispatch(setAgeRangeFilters(value as number[]));
        break;
      case "buttonClick":
        dispatch(reset());
        break;
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Data table filters.
      </h3>
      <Grid container spacing={3}>
        <Grid size={3} spacing={1}>
          <h3>By Name:</h3>
          <NameMultiSelect
            options={nameFilterOptions}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid size={3} spacing={1}>
          <h3>By Date of birth:</h3>
          <DateOfBirthFilter options={dateFormat} onChange={handleOnChange} />
        </Grid>
        <Grid size={2} spacing={1}>
          <h3>By age range:</h3>
          <AgeRangeFilter options={ageRangeOptions} onChange={handleOnChange} />
        </Grid>
        <Grid size={3} spacing={1}>
          <h3>By gender:</h3>
          <GenderFilter options={genderOptions} onChange={handleOnChange} />
        </Grid>
        <Grid size={3} spacing={1}>
          <Button options={buttonOptions} onClick={handleOnChange} />
        </Grid>
      </Grid>
    </>
  );
};

export default FilterSection;
