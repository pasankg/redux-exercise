import { Button } from "antd";
import * as Icons from "@ant-design/icons";
import { ButtonColorType, ButtonVariantType } from "antd/es/button";

interface OptionItem {
  variant: ButtonVariantType;
  colour: ButtonColorType;
  text: string;
  icon: string;
}

interface OptionProps {
  options: OptionItem;
  onClick: (type: string, value: string) => void;
}

const ButtonElement: React.FC<OptionProps> = ({ options, onClick }) => {
  // Dynamically select the icon based on the string passed
  const DynamicIcon = Icons[options?.icon as keyof typeof Icons];
  const handleClick = (_event: React.MouseEvent) => {
    onClick("buttonClick", _event.currentTarget.name);
  };

  return (
    <Button
      name={options?.text}
      color={options?.colour || "default"}
      variant={options?.variant}
      icon={DynamicIcon ? <DynamicIcon /> : undefined}
      onClick={handleClick}
    >
      {options?.text}
    </Button>
  );
};

export default ButtonElement;
