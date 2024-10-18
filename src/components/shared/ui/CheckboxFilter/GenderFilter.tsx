import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { filterByGender } from "../../../../slices";

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" }
];

const GenderFilter: React.FC = () => {
  const dispatch = useDispatch();
  const selectedGenders = useSelector((state) => state.users.selectedGenders);

  const onChange = (checkedList: string[]) => {
    dispatch(filterByGender(checkedList));
  };

  return (
    <>
      <CheckboxGroup
        options={plainOptions}
        value={selectedGenders}
        onChange={onChange}
      />
    </>
  );
};

export default GenderFilter;
