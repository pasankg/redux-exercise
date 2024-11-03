import { DatePicker, Space } from "antd";
import React from "react";
import { Dayjs } from "dayjs"; // Import the Dayjs type

const { RangePicker } = DatePicker;

interface OptionProps {
  id: string,
  options: unknown;
  onChange: (type: string, value: string[]) => void;
}

const DateFilter: React.FC<OptionProps> = ({ id, options, onChange }) => {
  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    onChange(id, dateStrings);
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={onRangeChange} format={options} />
    </Space>
  );
};

export default DateFilter;
