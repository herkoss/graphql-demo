import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { CREATE_USER, DELETE_USER, UPDATE_USER } from './mutation/user';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { User } from './types';

export const useAppViewModel = () => {
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<Array<User>>([]);
  const [userId, setUserId] = useState<string>('');
  const [userId2, setUserId2] = useState<string>('');
  const [userId3, setUserId3] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [email2, setEmail2] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [age2, setAge2] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const {
    data: usersData,
    loading: usersLoading,
    refetch: refetchUsers,
  } = useQuery<{ getAllUsers: Array<User> }>(GET_ALL_USERS);
  const {
    data: userData,
    loading: userLoading,
    refetch: refetchUser,
  } = useQuery<{ getOneUser: User }>(GET_ONE_USER);

  const [createUserMutation] = useMutation(CREATE_USER);
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [deleteUserMutation] = useMutation(DELETE_USER);

  useEffect(() => {
    if (!usersLoading && usersData) {
      setUsers(usersData.getAllUsers);
    }
  }, [usersData, usersLoading]);

  useEffect(() => {
    if (!userLoading && userData) {
      setUser(userData.getOneUser);
    }
  }, [userData, userLoading]);

  const getAllUsers = (event: any) => {
    event.preventDefault();
    refetchUsers();
  };

  const getOneUser = (event: any) => {
    event.preventDefault();
    refetchUser({ id: userId });
  };

  const createNewUser = async (event: any) => {
    event.preventDefault();
    const newUser = await createUserMutation({
      variables: { email, age: Number(age) },
    });

    setUsers(prevValue => [...prevValue, newUser.data.createUser]);
    setEmail('');
    setAge('');
  };

  const updateUser = async (event: any) => {
    event.preventDefault();

    const _age = age2.length > 0 ? Number(age2) : null;
    const _email = email2.length > 0 ? email2 : null;

    const updateUser = await updateUserMutation({
      variables: {
        id: userId2,
        email: _email,
        age: _age,
        isSubscribed,
      },
    });

    setUsers(prevValue =>
      prevValue.map(value =>
        value.id === updateUser.data.updateUser.id
          ? updateUser.data.updateUser
          : value
      )
    );

    setUserId2('');
    setEmail2('');
    setAge2('');
    setIsSubscribed(false);
  };

  const deleteUser = async (event: any) => {
    event.preventDefault();
    const deletedUser = await deleteUserMutation({
      variables: { id: userId3 },
    });

    setUsers(prevValue =>
      prevValue.filter(({ id }) => id !== deletedUser.data.deleteUser.id)
    );
    setUserId3('');
  };

  return {
    users,
    user,
    userId,
    userId2,
    userId3,
    email,
    email2,
    age,
    age2,
    isSubscribed,
    setUserId,
    setUserId2,
    setUserId3,
    setEmail,
    setEmail2,
    setAge,
    setAge2,
    setIsSubscribed,
    getAllUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser,
  };
};
