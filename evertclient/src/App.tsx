import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/account/SignIn";
import SignUp from "./components/account/SignUp";
import Home from "./components/main/Home";
import AdvertisimentList from "./components/advertisements/AdvertisementList";
import Advertisement from "./components/advertisements/Advertisement";
import CreateAdvertisiment from "./components/advertisements/CreateAdvertisement";
import CreateCategory from "./components/categories/CreateCategory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>  
          <Route path="/" Component={Home}/>
          <Route path="/register" Component={SignUp}/>
          <Route path="/login" Component={SignIn}/>
          <Route path="/advertisements" Component={AdvertisimentList}/>
          <Route path="/advertisements/create" Component={CreateAdvertisiment}/>
          <Route path="/advertisements/:id" element={<Advertisement />} />
          <Route path="/categories/create" Component={CreateCategory}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
