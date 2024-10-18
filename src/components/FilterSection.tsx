import React from "react";
import Grid from "@mui/system/Grid";
import {
  DateFilter,
  GenderFilter,
  AgeRangeFilter,
  NameMultiSelect,
} from "./shared";

const FilterSection: React.FC = () => {
  return (
    <>
      <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Data table filters.
      </h3>
      <Grid container spacing={3}>
        <Grid size={4} spacing={1}>
          <h3>By Name:</h3>
          <NameMultiSelect />
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
