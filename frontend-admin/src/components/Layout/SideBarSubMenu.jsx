import * as React from "react";
import { Fragment } from "react";
import {
  List,
  MenuItem,
  ListItemIcon,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSidebar } from "./SidebarContext";

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(5),
}));

const StyledList = styled(List)(({ theme, sidebarIsOpen }) => ({
  "& a": {
    transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
    paddingLeft: sidebarIsOpen ? theme.spacing(4) : theme.spacing(2),
  },
}));

const SubMenu = (props) => {
  const { handleToggle, isOpen, name, icon, children, dense } = props;
  const { sidebarIsOpen } = useSidebar();

  const header = (
    <MenuItem dense={dense} button onClick={handleToggle}>
      <StyledListItemIcon>
        {isOpen ? <ExpandMoreIcon /> : icon}
      </StyledListItemIcon>
      <Typography variant="inherit" color="textSecondary">
        {name}
      </Typography>
    </MenuItem>
  );

  return (
    <Fragment>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        <Tooltip title={name} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <StyledList 
          dense={dense} 
          component="div" 
          disablePadding 
          sidebarIsOpen={sidebarIsOpen}
        >
          {children}
        </StyledList>
      </Collapse>
    </Fragment>
  );
};

export default SubMenu;
