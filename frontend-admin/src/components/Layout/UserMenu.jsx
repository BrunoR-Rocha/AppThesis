import React, { forwardRef } from "react";
import { UserMenu, MenuItemLink, Logout } from "react-admin";
import SettingsIcon from '@mui/icons-material/Settings';

const ConfigurationMenu = forwardRef(({ onClick }, ref) => (
  <>
    <MenuItemLink
      ref={ref}
      to="/change_password"
      primaryText="Alterar Senha"
      leftIcon={<SettingsIcon />}
      onClick={onClick} // close the menu on click
    />
  </>
));

const MyUserMenu = (props) => (
  <UserMenu {...props}>
    <ConfigurationMenu />
    <Logout />
  </UserMenu>
);

export default MyUserMenu;
