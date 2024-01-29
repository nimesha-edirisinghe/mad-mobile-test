import { FC } from 'react';
import './_UserCard.scss';
import { UserDataI } from '../../types/response/user';
import { FaUserEdit } from 'react-icons/fa';

interface UserCardProps {
  userData: Partial<UserDataI>;
  onEditHandler: (key: string) => void;
}

const UserCard: FC<UserCardProps> = ({ userData, onEditHandler }) => {
  const { name, email, phone, location, picture } = userData;

  const userName = `${name?.first} ${name?.last}`;
  const contactNumber = phone;
  const address = location?.city;
  const imageURL = picture?.large;
  return (
    <main className="user-card-container">
      <section className="card-header-section">
        <div className="edit-icon " onClick={() => onEditHandler(email!)}>
          <FaUserEdit size="25px" />
        </div>
        <p className="username">{userName}</p>
      </section>
      <section className="profile-picture-section">
        <img src={imageURL} alt="name" className="profile-picture" />
      </section>
      <section className="user-information-section">
        <p>{email}</p>
        <p>{contactNumber}</p>
        <p>{address}</p>
      </section>
    </main>
  );
};

export default UserCard;
