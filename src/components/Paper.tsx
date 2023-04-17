import { FC, HTMLAttributes } from "react";

interface PaperProps extends HTMLAttributes<HTMLDivElement> {}

const Paper: FC<PaperProps> = ({ children, className }) => {
  return (
    <div className={`${className} bg-white p-4 rounded-md shadow-md`}>
      {children}
    </div>
  );
};

export default Paper;
