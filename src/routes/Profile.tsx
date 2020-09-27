import { authService } from 'fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
    console.log('profile test');
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
