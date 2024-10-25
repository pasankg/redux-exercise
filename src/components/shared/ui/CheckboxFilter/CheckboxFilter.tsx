import { Checkbox } from "antd";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

const CheckboxGroup = Checkbox.Group;

interface OptionItemProps {
  label: string;
  value: string;
}

interface OptionProps {
  options: OptionItemProps[];
  onChange: (type: string, value: string[]) => void;
}

const CheckboxFilter: React.FC<OptionProps> = ({ options, onChange }) => {
  const selectedValue = useSelector((state) => state.users.selectedGenders);
  console.log(`options`, options);
  if (isEmpty(options)) return null;
  
  const handleChange = (checkedList: string[]) => {
    onChange("ageSelect", checkedList as string[]);
    console.log(checkedList);
  };

  return (
    <>
      <CheckboxGroup
        options={options}
        value={selectedValue}
        onChange={handleChange}
      />
    </>
  );
};

export default CheckboxFilter;
