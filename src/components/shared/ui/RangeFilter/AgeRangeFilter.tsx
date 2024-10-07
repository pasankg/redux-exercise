import { Slider } from "antd";

const AgeRangeFilter: React.FC = () => {
  return <Slider range={{ draggableTrack: true }} defaultValue={[20, 30]} />;
};

export default AgeRangeFilter;
