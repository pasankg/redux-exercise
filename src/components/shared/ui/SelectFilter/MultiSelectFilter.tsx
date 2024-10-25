import React from "react";
import { Select } from "antd";
interface MultiSelectProps {
  options: Record<string, unknown>[];
  onChange: (type: string, value: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ onChange, options }) => {
  const handleChange = (value: string[]) => {
    onChange("multiSelect", value);
  };

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
