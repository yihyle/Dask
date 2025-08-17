import React from 'react';
import { COLORS } from '@/constants';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search';
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  disabled = false,
  required = false,
  name,
  id,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      className={`w-full h-[50px] rounded-[10px] bg-white border border-[#D7D7D7] focus:outline-none focus:border-[#05AA87] pl-4 pr-4 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
};

export default Input;
