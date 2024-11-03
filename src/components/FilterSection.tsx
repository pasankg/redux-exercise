import React from "react";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/system/Grid";
import {
  CheckboxFilter,
  MultiSelectFilter,
  DateFilter,
  RangeFilter,
  Button,
  SliderProps,
  OptionItemProps
} from "./shared";
import {
  setFilters
} from "../slices";

import {
  genderOptions,
  dateFormat,
  ageRangeOptions,

  buttonOptions,
} from "../constants";

type FilterType = "multiSelect" | "datePicker" | "rangePicker" | "checkbox";
interface FilterConfig {
  id: string;
  type: FilterType;
  label: string;
  onChange: (type: string, value: unknown) => void;
  values?: Record<string, unknown>[] | OptionItemProps | unknown;
  options?: unknown | SliderProps;
}

const FilterWrapper = ({ type, id, onChange, values, options } : FilterConfig) => {
  switch (type) {
    case "multiSelect": {
      return (
        <MultiSelectFilter id={id} onChange={onChange} values={values} />
      );
    }
    case "datePicker": {
      return <DateFilter id={id} options={options} onChange={onChange} />;
    }
    case "rangePicker": {
      return <RangeFilter id={id} onChange={onChange} values={values} />;
    }
    case "checkbox": {
      return <CheckboxFilter id={id} onChange={onChange} values={values} />;
    }
    default: {
      return <></>;
    }
  }
};

const FilterSection: React.FC = () => {
  const dispatch = useDispatch();

  const filterValues = useSelector((state) => state.users.filters);
  const nameFilterOptions = useSelector((state) => state.users.nameFilters)

  const handleOnChange = (type: string, value: unknown) => { //type: name, dateOfBirth, ageRange, gender
    dispatch(setFilters({...filterValues, [type]: value}))
  };

  const filterConfig: FilterConfig[] = [
    {
      id: "name",
      type: "multiSelect",
      label: "Select by Name:",
      onChange: handleOnChange,
      values: nameFilterOptions,
    },
    {
      id: "dateOfBirth",
      type: "datePicker",
      label: "By Date of birth:",
      onChange: handleOnChange,
      options: dateFormat,
    },
    {
      id: "ageRange",
      type: "rangePicker",
      label: "By age range:",
      onChange: handleOnChange,
      values: ageRangeOptions,
    },
    {
      id: "gender",
      type: "checkbox",
      label: "By gender:",
      onChange: handleOnChange,
      values: genderOptions,
    },
  ];

  return (
    <>
      <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Data table filters.
      </h3>
      <Grid container spacing={3}>
        {map(filterConfig, (config, index) => (
          <Grid key={`${config.id}-${index}`} size={3} spacing={1}>
            <p>{config.label}</p>
            <FilterWrapper {...config} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FilterSection;
