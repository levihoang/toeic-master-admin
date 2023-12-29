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
          className={`h-[30px] p-6 rounded-3xl font-bold bg-[#4D57AA] flex justify-center items-center cursor-pointer hover:opacity-90 transition-all text-white ${className}`}
        >
          {children}
        </button>
      ) : (
        <Link
          to={url}
          className={`h-[30px] p-6 rounded-3xl font-bold bg-[#4D57AA] flex justify-center items-center cursor-pointer hover:opacity-90 transition-all text-white ${className}`}
        >
          {children}
        </Link>
      )}
    </>
  );
};
