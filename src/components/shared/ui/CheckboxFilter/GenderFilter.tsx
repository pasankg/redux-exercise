import { Checkbox, Divider } from "antd";
import type { CheckboxProps } from "antd";
import React, { useState } from "react";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Male", "Female", "Other"];
const defaultCheckedList = ["Male"];

const GenderFilter: React.FC = () => {
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  return (
    <>
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </>
  );
};

export default GenderFilter;
