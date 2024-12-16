import React from "react";

interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?:string;
}

const Select = ({ label, options, onChange, defaultValue, className}:SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <div className={`custom-select-wrapper ${className}`}>
      <label htmlFor="custom-select" className="select-label">
        {label}&#8595;
      </label>
      <select
        id="custom-select"
        className="custom-select"
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} ↓
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
