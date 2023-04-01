import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/evert.svg';
import './main.css';


const Header: React.FC = () => {
  return (
    <AppBar sx={{ bgcolor: "#022d3d" }} className="appBar">
      <Toolbar>
        <Link to="/">
          <Logo width={64} height={64} className='logo' />
        </Link>
        <div style={{ width: '90%' }}></div>

        <Typography variant="h6" component="div">
          <Link to="/login" className='signInText'>
            Sign in
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;