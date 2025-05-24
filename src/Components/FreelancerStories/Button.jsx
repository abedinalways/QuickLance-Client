import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300 shadow hover:bg-gray-400 transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
