import { FC, HTMLAttributes } from "react";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: string | JSX.Element;
  transparent?: boolean;
}

const IconButton: FC<IconButtonProps> = ({ icon, transparent, ...props }) => (
  <button
    style={transparent ? { background: "transparent" } : {}}
    className="w-5 h-5 rounded-md  bg-white hover:shadow-lg active:bg-gray-200 flex justify-center items-center"
    {...props}
  >
    {icon}
  </button>
);

const Button = ({ children, ...props }: HTMLAttributes<HTMLButtonElement>) => (
  <button
    className="bg-blue-400 hover:bg-blue-500 hover:shadow-lg active:bg-blue-300 text-white px-4 py-2 rounded-md"
    {...props}
  >
    {children}
  </button>
);

export { IconButton, Button };
