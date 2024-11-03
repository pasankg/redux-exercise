import { Checkbox } from "antd";
import { isEmpty, get } from "lodash";
import { useSelector } from "react-redux";

const CheckboxGroup = Checkbox.Group;

export interface OptionItemProps {
  label: string;
  value: string;
}

interface OptionProps {
  id: string,
  values: OptionItemProps[];
  onChange: (type: string, value: string[]) => void;
}

const CheckboxFilter: React.FC<OptionProps> = ({ id, values, onChange }) => {
  const selectedValue = useSelector((state) => get(state.users.filters, id)); 
  if (isEmpty(values)) return null;
  
  const handleChange = (checkedList: string[]) => {
    onChange(id, checkedList as string[]);    
  };

  return (
    <>
      <CheckboxGroup
        options={values}
        value={selectedValue}
        onChange={handleChange}
      />
    </>
  );
};

export default CheckboxFilter;
