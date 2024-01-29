import { ButtonHTMLAttributes, FC } from 'react';
import './_Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}
const Button: FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  const buttonClass = `button ${variant}`;
  return <button className={buttonClass} {...props} />;
};

export default Button;
