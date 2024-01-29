import { FC } from 'react';
import './_UserCard.scss';
import { ResultDataI } from '../../types/response/user';

interface UserCardProps {
  userData: Partial<ResultDataI>;
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
        <div className="edit-icon " onClick={() => onEditHandler(email!)}></div>
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
