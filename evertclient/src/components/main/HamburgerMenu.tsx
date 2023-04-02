import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const menuItems = (
    <List>
      <ListItem button onClick={() => navigate('/')}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => alert('About clicked')}>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button onClick={() => alert('Contact clicked')}>
        <ListItemText primary="Contact" />
      </ListItem>
    </List>
  );

  return (
    <div>
      <Toolbar>
        <IconButton
          edge="start"
          sx={{ mr: 2 }}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {menuItems}
      </Drawer>
    </div>
  );
};

export default HamburgerMenu;