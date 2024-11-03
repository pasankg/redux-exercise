import { Slider } from "antd";
import type { SliderSingleProps } from "antd";

export interface SliderProps {
  min: number;
  max: number;
  markers: SliderSingleProps;
}

interface OptionProps {
  id: string,
  values: SliderProps;
  onChange: (type: string, value: number[]) => void;
}

const RangeFilter: React.FC<OptionProps> = ({ id, values, onChange }) => {
  const onChangeComplete = (value: number[]) => {
    onChange(id, value);
  };

  const markers: SliderSingleProps["marks"] = values?.markers;

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

export default RangeFilter;
