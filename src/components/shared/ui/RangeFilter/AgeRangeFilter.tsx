import { Slider } from "antd";

const onChangeComplete = () => {};

const AgeRangeFilter: React.FC = () => {
  return (
    <Slider
      range={{ draggableTrack: true }}
      defaultValue={[]}
      max={65}
      min={18}
      onChangeComplete={onChangeComplete}
      tooltip={{ open: true }}
    />
  );
};

export default AgeRangeFilter;
