import React, { ChangeEvent, CSSProperties } from 'react';

interface InputProps {
  value: string;
  name: string;
  onChange: (newValue: string, name: string) => void;
  placeholder: string;
  style?: CSSProperties;
  isDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  name,
  onChange,
  placeholder,
  style,
  isDisabled,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      style={style}
      disabled={isDisabled}
    />
  );
};

export default Input;
