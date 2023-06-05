import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav.jsx';

export default function Layout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}
