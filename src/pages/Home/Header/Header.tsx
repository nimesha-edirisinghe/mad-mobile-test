import { FC } from 'react';
import './_Header.scss';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

interface HeaderProps {
  value: string;
  onChangeHandler: (value: string) => void;
  sortHandler: () => void;
}

const Header: FC<HeaderProps> = ({ value, onChangeHandler, sortHandler }) => {
  const inputStyles = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '8px',
    width: '300px',
    height: '20px',
  };
  return (
    <main className="header-container">
      <div className="input-container">
        <Input
          onChange={onChangeHandler}
          value={value}
          placeholder="Enter the name"
          style={inputStyles}
          name="userName"
        />
      </div>
      <Button onClick={sortHandler}>Sort By Name</Button>
    </main>
  );
};

export default Header;
