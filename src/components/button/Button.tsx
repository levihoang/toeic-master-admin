import React from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  url?: string;
};

export const Button = ({
  className,
  children,
  type,
  onClick,
  url
}: ButtonProps) => {
  return (
    <>
      {!url ? (
        <button
          type={type || 'button'}
          onClick={onClick}
          className={`h-[30px] p-6 rounded-[6px] font-bold  flex justify-center items-center bg-[#fff] cursor-pointer hover:bg-[#a7cfec] ${className}`}
        >
          {children}
        </button>
      ) : (
        <Link
          to={url}
          className={`h-[30px] p-6 rounded-[6px] font-bold  flex justify-center items-center bg-[#fff] cursor-pointer hover:bg-[#a7cfec] ${className}`}
        >
          {children}
        </Link>
      )}
    </>
  );
};
