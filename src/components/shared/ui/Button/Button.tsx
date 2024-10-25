import { Button } from "antd";

interface OptionItem {
  variant: string;
  colour: string;
  text: string;
}

interface OptionProps {
  options: OptionItem[];
}

const ButtonElement: React.FC<OptionProps> = ({ options }) => {
  return (
    <Button color={options?.colour} variant={options?.variant}>
      {options?.text}
    </Button>
  );
};

export default ButtonElement;
