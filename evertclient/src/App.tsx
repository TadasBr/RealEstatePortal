import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/account/SignIn';
import SignUp from './components/account/SignUp';
import Home from './components/main/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/register' Component={SignUp}/>
          <Route path='/login' Component={SignIn}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
