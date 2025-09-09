import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = ""
}) => {
  return (
    <div className={`min-h-[76px] w-full max-w-lg mt-2 max-md:max-w-full ${className}`}>
      <label className="text-[#BB9205] text-sm leading-none tracking-[0.14px] max-md:max-w-full">
        {label}
      </label>
      <div className="items-center flex min-h-12 w-full gap-2 overflow-hidden text-base text-[#2C2623] tracking-[0.16px] leading-none bg-[#FEF9E5] mt-2 px-4 py-3.5 rounded-2xl max-md:max-w-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-[#2C2623] self-stretch flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none"
          aria-label={label}
        />
      </div>
    </div>
  );
};
