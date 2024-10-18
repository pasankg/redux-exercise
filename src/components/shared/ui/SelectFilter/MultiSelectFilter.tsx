import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [];

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const MultiSelect: React.FC = () => (
  <Select
    mode="tags"
    style={{ width: "100%" }}
    onChange={handleChange}
    tokenSeparators={[","]}
    options={options}
  />
);

export default MultiSelect;
