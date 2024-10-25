import React from "react";
import { useDispatch } from 'react-redux'
import Grid from "@mui/system/Grid";
import {  
  GenderFilter, 
} from "./shared";
import { setGenderFilter } from '../slices'

const FilterSection: React.FC = () => {
  const dispatch = useDispatch();

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];

  const handleOnChange = (type: string, value: unknown) => {
    switch(type){
      case 'ageSelect':
        dispatch(setGenderFilter(value as string[]))
    }
    console.log(`type`, type);
    console.log(`value`, value);
  }

  return (
    <>
      <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Data table filters.
      </h3>
      <Grid container spacing={3}>
        {/* <Grid size={4} spacing={1}>
          <h3>By Name:</h3>
          <NameMultiSelect
            options={genderOptions}
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
        </Grid> */}
        <Grid size={4} spacing={1}>
          <h3>By gender:</h3>
          <GenderFilter options={genderOptions} onChange={handleOnChange} />
        </Grid>
      </Grid>
    </>
  );
};

export default FilterSection;
