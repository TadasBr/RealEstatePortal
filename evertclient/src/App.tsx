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
import MyAdvertisements from "./components/advertisements/MyAdvertisiments";
import EditSellAdvertisement from "./components/advertisements/EditSellAdvertisement";
import EditBuyAdvertisement from "./components/advertisements/EditBuyAdvertisement";
import Statistics from "./components/main/Statistics";
import CatList from "./components/categories/CatList";
import EditCategory from "./components/categories/EditCategory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={AdvertisimentList} />
          <Route path="/register" Component={SignUp} />
          <Route path="/login" Component={SignIn} />
          <Route path="/recommendations" Component={Home} />
          <Route
            path="/sell-advertisements/create"
            Component={CreateAdvertisiment}
          />
          <Route path="/sell-advertisements/:id" element={<Advertisement />} />
          <Route
            path="/buy-advertisements/:id"
            element={<BuyAdvertisement />}
          />
          <Route
            path="/edit-sell-advertisements/:id"
            element={<EditSellAdvertisement />}
          />
          <Route
            path="/edit-buy-advertisements/:id"
            element={<EditBuyAdvertisement />}
          />
          <Route
            path="/buy-advertisements/create"
            Component={CreateBuyAdvertisement}
          />
          <Route path="/statistics" Component={Statistics} />
          <Route path="/allcategories" element={<CatList />} />
          <Route path="/edit-categories/:id" element={<EditCategory />} />
          <Route path="/categories/create" Component={CreateCategory} />
          <Route path="/my-advertisements" Component={MyAdvertisements} />
          <Route path="/profile" Component={Profile} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
