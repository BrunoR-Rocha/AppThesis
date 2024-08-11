import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../../components/main/NavBar';
import Footer from '../../components/main/Footer';

const CustomLayout = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/register' ;

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      <Outlet />
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

export default CustomLayout;