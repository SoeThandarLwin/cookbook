import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import Axios from '../utils/Axios.js';
import GlobalContext from '../contexts/GlobalContext.js';

export default function Profile() {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { setProfile } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  useQuery(['profile'], () => {
    Axios.get('profile').then((res) => {
      setAvatar(res.data.avatar);
      setName(res.data.name);
    });
  });

  const getAvatar = () => {
    return `http://localhost:3000/images/${avatar ? avatar : 'avatar.png'}`;
  };

  const handleLogoutNo = () => {
    setOpen(false);
  };

  const handleLogoutYes = () => {
    Axios.get('logout').then((resp) => {
      setProfile({});
      navigate('/');
    });

    setOpen(false);
  };

  const handleDeleteNo = () => {
    setDeleteOpen(false);
  };

  const handleDeleteYes = () => {
    Axios.delete('profile').then((resp) => {
      setProfile({});
      navigate('/');
    });
  };

  const handleChangePassword = () => {};

  const handleUpdateProfile = () => {
    navigate('/profile/update');
  };

  const handleFavouriteRecipes = () => {};

  const handleMyRecipes = () => {
    navigate('/profile/recipes');
  };

  const handleDeleteAccount = () => {};

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle id="alert-dialog-title">
          Your account will be deleted
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your account, recipes and all other data will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteNo} autoFocus>
            No
          </Button>
          <Button onClick={handleDeleteYes}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Your account will be logged out
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be logged out.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutNo}>No</Button>
          <Button onClick={handleLogoutYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Avatar
          src={getAvatar()}
          sx={{
            width: 128,
            height: 128,
            border: '1px solid',
            margin: '0 auto',
            mb: 2.5,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            width: '100%',
            textAlign: 'center',
            mb: 2.5,
            color: '#765A00',
          }}
        >
          {name}
        </Typography>

        <List
          style={{
            backgroundColor: '#ECE1CF',
            padding: '2.5rem',
            borderRadius: '1rem',
          }}
        >
          <ListItem>
            <ListItemText
              primary="Log Out"
              sx={{ color: '#765A00' }}
              onClick={handleClickOpen}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Change Password" sx={{ color: '#765A00' }} />
          </ListItem>
          <ListItem onClick={handleUpdateProfile}>
            <ListItemText primary="Update Profile" sx={{ color: '#765A00' }} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Favourite Recipes"
              sx={{ color: '#765A00' }}
            />
          </ListItem>
          <ListItem onClick={handleMyRecipes}>
            <ListItemText primary="My Recipes" sx={{ color: '#765A00' }} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Delete Account"
              sx={{ color: 'red' }}
              onClick={handleDeleteOpen}
            />
          </ListItem>
        </List>
      </div>
    </Container>
  );
}
