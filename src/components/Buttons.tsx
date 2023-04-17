import { FC, HTMLAttributes } from "react";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: string | JSX.Element;
  transparent?: boolean;
}

const IconButton: FC<IconButtonProps> = ({ icon, transparent, ...props }) => (
  <button
    style={transparent ? { background: "transparent" } : {}}
    className="w-5 h-5 rounded-md bg-white flex justify-center items-center"
    {...props}
  >
    {icon}
  </button>
);

export { IconButton };
