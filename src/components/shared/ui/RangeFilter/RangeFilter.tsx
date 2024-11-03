import { Slider } from "antd";
import type { SliderSingleProps } from "antd";

interface SliderProps {
  min: number;
  max: number;
  markers: SliderSingleProps;
}

interface OptionProps {
  options: SliderProps;
  onChange: (type: string, value: number[]) => void;
}

const RangeFilter: React.FC<OptionProps> = ({ options, onChange }) => {
  const onChangeComplete = (value: number[]) => {
    onChange("rangeSelect", value);
  };

  const markers: SliderSingleProps["marks"] = options?.markers;

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
