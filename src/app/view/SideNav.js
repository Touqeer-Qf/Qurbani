import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Tooltip, Menu, Avatar, Typography, Toolbar, ListItemText, ListItemButton, ListItem, List, Button, CardMedia } from '@mui/material';
import { NotificationsActiveTwoTone } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
// import Images from './../assets/Images';
import Navigation from './../Navigation';
import colors from '../style/colors';
import useAuth from '../useAuth';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3, 0, 1, 1),
  margin: '10px',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const DrawerFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(4, 1, 3, 1),
  borderRadius: "10px",
  margin: '10px',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function SideNav(props) {
  const {logout} = useAuth()
  const { window } = props;
  //* For List Open and Expand
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate()
  const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <Link to='/'>
          <img src={"https://upload.wikimedia.org/wikipedia/commons/7/7b/Alkhidmat_Foundation_Pakistan.png"} alt="Scriptio" style={{ width: "105px", marginRight: "10px" }} />
        </Link>
      </DrawerHeader>
      <List>
        {Navigation.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={pathname === item.path ? true : false}
              onClick={() => { navigate(item.path) }}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                m: 1,
                borderRadius: "8px",
                "&.Mui-selected": {
                  backgroundImage: colors.primaryGradient,
                  bgcolor: colors.primary,
                  color: colors.white,
                  ":hover": {
                    backgroundColor: colors.primary,
                    color: colors.white,
                  }
                },
                ":hover": {
                  backgroundColor: colors.primary,
                  color: colors.white,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 4,
                  justifyContent: 'center',
                  bgcolor: colors.white,
                  borderRadius: '6px',
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: colors.white,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          width: { sm: `calc(100% - 285px)` },
          // ml: { sm: `${drawerWidth}px` },
          borderRadius: "12px",
          boxShadow: "none",
          mt: 2,
          mr: 4,
        }}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
            <Box>
            </Box>
            <Box display="flex">
              <Button variant="contained" sx={{bgColor:colors.primary}} onClick={logout}>Logout</Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: colors.white },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

SideNav.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideNav;