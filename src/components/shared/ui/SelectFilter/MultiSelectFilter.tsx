import React from "react";
import { Select } from "antd";
interface MultiSelectProps {
  id: string,
  values: unknown;
  onChange: (type: string, value: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ id, onChange, values }) => {
  const handleChange = (value: string[]) => {
    onChange(id, value);
  };

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      onChange={handleChange}
      tokenSeparators={[","]}
      options={values}
    />
  );
};

export default MultiSelect;
