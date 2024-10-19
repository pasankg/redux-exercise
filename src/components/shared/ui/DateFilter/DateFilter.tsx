import { DatePicker, Space } from "antd";
import React from "react";
import type { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { setDateOfBirthFilter } from "../../../../slices";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-M-D";

const DateFilter: React.FC = () => {
  const dispatch = useDispatch();

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      dispatch(setDateOfBirthFilter(dateStrings));
    }
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={onRangeChange} format={dateFormat} />
    </Space>
  );
};

export default DateFilter;
