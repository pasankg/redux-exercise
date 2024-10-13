import { Checkbox, Divider } from "antd";
// import type { CheckboxProps } from "antd";
// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGender } from "../../../../slices";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Male", "Female", "Other"];
// const defaultCheckedList = ["Male"];

const GenderFilter: React.FC = () => {
  const dispatch = useDispatch();
  const selectedGenders = useSelector((state) => state.users.selectedGenders);
  // const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

  // const onChange = (list: string[]) => {
  //   setCheckedList(list);
  // };

  const onChange = (checkedList: string[]) => {
    dispatch(filterByGender(checkedList));
  };

  return (
    <>
      <CheckboxGroup
        options={plainOptions}
        value={selectedGenders}
        onChange={onChange}
      />
    </>
  );
};

export default GenderFilter;
