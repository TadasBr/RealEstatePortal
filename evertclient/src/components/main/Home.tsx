import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/evert.svg';
import './main.css';
import Header from './Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;