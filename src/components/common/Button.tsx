import React, { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<ButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className="mt-2 w-full bg-red-500 disabled:bg-red-200  text-white rounded-lg py-2 flex text-lg hover:bg-red-600 [&:active:not(disabled)]:scale-[1.03] transition uppercase justify-center"
    >
      {children}
    </button>
  );
};

export default Button;
