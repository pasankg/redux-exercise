import { DatePicker, Space } from "antd";
import React from "react";

const { RangePicker } = DatePicker;

const DateFilter: React.FC = () => {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker />
    </Space>
  );
};

export default DateFilter;
