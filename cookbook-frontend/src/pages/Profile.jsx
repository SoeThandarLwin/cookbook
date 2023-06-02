import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import GlobalContext from '../contexts/GlobalContext.js';
import { useQuery } from 'react-query';
import Axios from '../utils/Axios.js';

export default function Profile() {
  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();

  useQuery(['profile'], () => {
    Axios.get('profile').then((res) => {
      setAvatar(res.data.avatar);
    });
  });

  const getAvatar = () => {
    return `http://localhost:3000/images/${avatar ? avatar : 'avatar.png'}`;
  };

  const handleLogout = () => {};

  const handleChangePassword = () => {};

  const handleUpdateProfile = () => {
    navigate('/profile/update');
  };

  const handleFavouriteRecipes = () => {};

  const handleMyRecipes = () => {};

  const handleDeleteAccount = () => {};

  return (
    <div>
      <img src={getAvatar()} />

      <p>Log Out</p>

      <p>Change Password</p>

      <p onClick={handleUpdateProfile}>Update Profile</p>

      <p>Favourite Recipes</p>

      <p>My Recipes</p>

      <p>Delete Account</p>
    </div>
  );
}
