import React, { useState } from 'react';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
  placeholder?: string;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`min-h-[76px] w-full max-w-lg mt-2 max-md:max-w-full ${className}`}>
      <label className="text-[#BB9205] text-sm leading-none tracking-[0.14px] max-md:max-w-full">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="items-center flex min-h-12 w-full gap-2 overflow-hidden text-base text-[#2C2623] tracking-[0.16px] leading-none flex-wrap bg-[#FEF9E5] mt-2 px-4 py-3.5 rounded-2xl max-md:max-w-full"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={label}
        >
          <div className="text-[#2C2623] self-stretch flex-1 shrink basis-[0%] my-auto max-md:max-w-full text-left">
            {selectedOption ? selectedOption.label : placeholder}
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/7866627671144d8d8b91ecf861203027/025faf8b3e05c878d48d9a0447041f87bd0ff3a1?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
            alt=""
          />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-10 bg-[#FEF9E5] border-2 border-[#FBDEB1] rounded-2xl mt-1 shadow-lg">
            <ul role="listbox" className="py-2">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className="w-full text-left px-4 py-2 text-[#2C2623] hover:bg-[#FCE699] transition-colors"
                    role="option"
                    aria-selected={value === option.value}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
