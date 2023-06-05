import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
  Home,
  Person,
  ReceiptLong,
  Search,
  Settings,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = useState('home');
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 'home':
        navigate('/');
        break;
      case 'recipes':
        navigate('/recipes');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
    }
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          '& .Mui-selected, .Mui-selected > svg': {
            color: '#765A00',
          },
        }}
      >
        <BottomNavigationAction label="Home" value="home" icon={<Home />} />
        <BottomNavigationAction
          label="Recipes"
          value="recipes"
          icon={<ReceiptLong />}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<Search />}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<Person />}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<Settings />}
        />
      </BottomNavigation>
    </Paper>
  );
}
