import React from 'react';
import Image from 'next/image';
import { COLORS } from '@/constants';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  className = "",
  disabled = false,
}) => {
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="appearance-none w-full h-[50px] border border-[#D7D7D7] rounded-[10px] pl-4 pr-10 bg-white focus:outline-none focus:border-[#05AA87] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <Image
        src="/images/under.svg"
        alt="화살표"
        width={16}
        height={16}
        className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

export default Select;
