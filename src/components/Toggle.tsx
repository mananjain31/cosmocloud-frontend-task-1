import { FC, HTMLAttributes, forwardRef } from "react";

interface ToggleProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  toggleChecked?: () => void;
}

const Toggle: FC<ToggleProps> = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, checked, toggleChecked, ...props }, ref) => (
    <>
      <label className="flex items-center cursor-pointer gap-1 font-semibold text-gray-700">
        <span>{label}</span>
        <span className="relative inline-flex items-center cursor-pointer">
          <input
            ref={ref}
            checked={checked}
            onChange={toggleChecked}
            {...props}
            type="checkbox"
            className="sr-only peer"
          />
          <div
            className={`w-11 h-6 bg-gray-200 
        peer-focus:outline-none peer-focus:ring-4
        peer-focus:ring-blue-300 rounded-full 
        peer dark:bg-gray-300
        peer-checked:after:translate-x-full
         after:content-[''] 
        after:absolute after:top-[2px] after:left-[2px]
        after:bg-white 
         after:rounded-full after:h-5 after:w-5
        after:transition-all 
        peer-checked:bg-blue-600`}
          ></div>
        </span>
      </label>
    </>
  )
);

export default Toggle;
