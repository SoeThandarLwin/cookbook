import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

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
      <p>Log Out</p>

      <p>Change Password</p>

      <p onClick={handleUpdateProfile}>Update Profile</p>

      <p>Favourite Recipes</p>

      <p>My Recipes</p>

      <p>Delete Account</p>
    </div>
  );
}
