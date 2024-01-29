import { FC, useState } from 'react';
import './_UserEditableCard.scss';
import { FormDataI, UserDataI } from '../../types/response/user';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface Props {
  userData: Partial<UserDataI>;
  onSaveHandler: (formData: FormDataI) => void;
  onCancelHandler: () => void;
}

const UserEditableCard: FC<Props> = ({
  userData,
  onSaveHandler,
  onCancelHandler,
}) => {
  const { name, email, phone, location, picture } = userData;

  const firstName = name?.first;
  const lastName = name?.last;
  const contactNumber = phone;
  const address = location?.city;
  const imageURL = picture?.large;

  const [formData, setFormData] = useState<FormDataI>({
    firstName: firstName!,
    lastName: lastName!,
    email: email!,
    contactNumber: contactNumber!,
    address: address!,
  });

  const inputStyles = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '8px',
    width: '100px',
    height: '15px',
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleInputChange = (value: string, field: string) => {
    updateFormData(field, value);
  };

  const onSubmitHandler = () => {
    onSaveHandler(formData);
  };

  return (
    <main className="edit-card-container">
      <section className="card-header-section">
        <Input
          onChange={handleInputChange}
          value={formData.firstName!}
          placeholder="Enter the name"
          style={inputStyles}
          name="firstName"
        />
        <Input
          onChange={handleInputChange}
          value={formData.lastName!}
          placeholder="Enter the name"
          style={inputStyles}
          name="lastName"
        />
      </section>
      <section className="profile-picture-section">
        <img src={imageURL} alt="name" className="profile-picture" />
      </section>
      <section className="edit-information-section">
        <p className="email-text">{formData.email}</p>
        <Input
          onChange={handleInputChange}
          value={formData.contactNumber!}
          placeholder="Enter the name"
          style={inputStyles}
          name="contactNumber"
        />
        <Input
          onChange={handleInputChange}
          value={formData.address!}
          placeholder="Enter the name"
          style={inputStyles}
          name="address"
        />
        <section className="edit-footer">
          <div>
            <Button variant="secondary" onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
          <div>
            <Button onClick={onSubmitHandler}>Save</Button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default UserEditableCard;
