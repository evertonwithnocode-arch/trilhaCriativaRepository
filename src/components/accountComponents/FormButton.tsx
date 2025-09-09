import React from 'react';

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = ''
}) => {
  const baseClasses = "justify-center items-center flex min-h-12 gap-4 text-lg font-extrabold tracking-[0.18px] leading-none mt-10 pl-5 pr-6 py-3 rounded-xl max-md:pr-5 transition-colors";
  
  const variantClasses = {
    primary: "text-white bg-[#F7B34D] hover:bg-[#E6A043] disabled:bg-gray-400",
    secondary: "text-[#2C2623] bg-[#FCE699] hover:bg-[#F7B34D]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-disabled={disabled}
    >
      <span className={`self-stretch my-auto ${variant === 'primary' ? 'text-white' : 'text-[#2C2623]'}`}>
        {children}
      </span>
    </button>
  );
};
