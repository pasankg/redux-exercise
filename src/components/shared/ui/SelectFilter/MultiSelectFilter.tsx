import React from "react";
import { Select } from "antd";
// import type { SelectProps } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUserNameFilters } from "../../../../slices";
import { isEmpty, isNull, split } from "lodash";

// const options: SelectProps["options"] = [];

const MultiSelect: React.FC = () => {
 const dispatch = useDispatch();

 const handleChange = (value: string) => {
  if(!isEmpty(value)) {
   const selectedValues = split(value, ',')
   dispatch(setUserNameFilters(selectedValues))
  }
  else {
   dispatch(setUserNameFilters([]))
  }
};

  const options = useSelector((state) => state.users.nameFilters);

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      onChange={handleChange}
      tokenSeparators={[","]}
      options={options}
    />
  );
};

export default MultiSelect;
