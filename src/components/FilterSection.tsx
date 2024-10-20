import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import Grid from "@mui/system/Grid";
import {
  DateFilter,
  GenderFilter,
  AgeRangeFilter,
  NameMultiSelect,
} from "./shared";
import { setFilterUsername } from '../slices'

const FilterSection: React.FC = () => {
  const dispatch = useDispatch()
  const selectedUsers = useSelector((state) => state.users.nameFilters);
  const handleOnChange = (type: string, value: unknown) => {
    console.log(`---filteredValue`, value)
    switch(type) {
      case 'multiSelect': 
        dispatch(setFilterUsername(value as string[]))
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Data table filters.
      </h3>
      <Grid container spacing={3}>
        <Grid size={4} spacing={1}>
          <h3>By Name:</h3>
          <NameMultiSelect
            options={selectedUsers}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid size={4} spacing={1}>
          <h3>By Date of birth:</h3>
          <DateFilter />
        </Grid>
        <Grid size={4} spacing={1}>
          <h3>By age range:</h3>
          <AgeRangeFilter />
        </Grid>
        <Grid size={4} spacing={1}>
          <h3>By gender:</h3>
          <GenderFilter />
        </Grid>
      </Grid>
    </>
  );
};

export default FilterSection;
