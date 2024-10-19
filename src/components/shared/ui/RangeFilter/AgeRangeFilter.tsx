import { Slider } from "antd";
import type { SliderSingleProps } from "antd";
import { useDispatch } from "react-redux";
import { setAgeFilters } from "../../../../slices";

const AgeRangeFilter: React.FC = () => {
  const dispatch = useDispatch();
  const onChangeComplete = (value: number[]) => {
    dispatch(setAgeFilters(value));
  };

  const markers: SliderSingleProps["marks"] = {
    18: "18",
    25: "25",
    35: "35",
    45: "45",
    55: "55",
    65: "65",
  };

  return (
    <Slider
      range={{ draggableTrack: true }}
      defaultValue={[]}
      max={65}
      min={18}
      marks={markers}
      onChangeComplete={onChangeComplete}
      tooltip={{ open: true }}
    />
  );
};

export default AgeRangeFilter;
