import * as React from "react";
import { AppBar } from "react-admin";
import { Typography } from '@mui/material';
import MyUserMenu from "./UserMenu";

const MyAppBar = (props) => {
  return (
    <AppBar {...props} userMenu={<MyUserMenu />}>
      <Typography
        variant="h6"
        color="inherit"
        sx={{
          flex: 1,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}
        id="react-admin-title"
      />

      <span className={{flex: 1}} />
    </AppBar>
  );
};

export default MyAppBar;
