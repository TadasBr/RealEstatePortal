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
import Profile from "./components/main/Profile";
import CreateBuyAdvertisement from "./components/advertisements/CreateBuyAdvertisement";
import BuyAdvertisement from "./components/advertisements/BuyAdvertisement";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>  
          <Route path="/" Component={Home}/>
          <Route path="/register" Component={SignUp}/>
          <Route path="/login" Component={SignIn}/>
          <Route path="/advertisements" Component={AdvertisimentList}/>
          <Route path="/sell-advertisements/create" Component={CreateAdvertisiment}/>
          <Route path="/sell-advertisements/:id" element={<Advertisement />} />
          <Route path="/buy-advertisements/:id" element={<BuyAdvertisement />} />
          <Route path="/buy-advertisements/create" Component={CreateBuyAdvertisement}/>
          <Route path="/categories/create" Component={CreateCategory}/>
          <Route path="/profile" Component={Profile}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
