import { FC, Suspense, lazy, useEffect, useState } from 'react';
import { UserService } from '../../services/userService';
import { FormDataI, UserResponseI } from '../../types/response/user';
import { orderBy } from 'lodash';
import './_Home.scss';
import Header from './Header/Header';
import UserEditableCard from '../../components/UserEditableCard/UserEditableCard';

const UserCard = lazy(() => import('../../components/UserCard/UserCard'));

interface Props {
  userService: UserService;
}

const Home: FC<Props> = ({ userService }) => {
  const [userList, setUserList] = useState<UserResponseI | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editModeCard, setEditModeCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await userService.getUser();
        const userData = userService.getUserResponse();
        setUserList(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSaveHandler = (formData: FormDataI) => {
    setEditModeCard('');

    const updateUserData = async () => {
      try {
        await userService.updateUser(formData);
      } catch (error) {
        console.error('Updating error', error);
      }
    };

    updateUserData();
  };

  const onChangeHandler = (value: string) => {
    setSearchKey(value);
  };

  useEffect(() => {
    const userData = userService.getUserResponse();
    setUserList(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editModeCard]);

  const handleSortClick = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const onEditHandler = (email: string) => {
    setEditModeCard(email);
  };

  const onCancelHandler = () => {
    setEditModeCard('');
  };

  const filterUserList = (): UserResponseI => {
    const filteredUsers = userList?.results?.filter(
      (user) =>
        user.name.first.toLowerCase().includes(searchKey.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchKey.toLowerCase()) ||
        user.email.toLowerCase().includes(searchKey.toLowerCase())
    );

    const sortedUsers = orderBy(
      filteredUsers,
      [(user) => `${user.name.first} ${user.name.last}`.toLowerCase()],
      [sortOrder]
    );

    return { results: sortedUsers, info: userList?.info! };
  };

  const filterDataList = filterUserList();

  return (
    <>
      <Header
        onChangeHandler={onChangeHandler}
        value={searchKey}
        sortHandler={handleSortClick}
      />
      <div className="home-container">
        <Suspense fallback={<div>Loading...</div>}>
          {userList &&
            filterDataList?.results?.map((user) =>
              editModeCard === user.email ? (
                <UserEditableCard
                  key={user.email}
                  userData={user}
                  onSaveHandler={onSaveHandler}
                  onCancelHandler={onCancelHandler}
                />
              ) : (
                <UserCard
                  key={user.email}
                  userData={user}
                  onEditHandler={onEditHandler}
                />
              )
            )}
        </Suspense>
      </div>
    </>
  );
};

export default Home;
